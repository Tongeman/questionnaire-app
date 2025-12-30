/**
 * Business Assessment Diagram Generator
 * 
 * Generates an SVG diagram showing three overlapping circles (Cash, Capacity, Customers)
 * with 9 coloured ring-band segments representing different business factors.
 * 
 * Usage:
 *   const svg = DiagramGenerator.generate({
 *       "Financial Control": "green",
 *       "Growth Strategy": "amber",
 *       "Lifestyle & Exit Plan": "red",
 *       "Drive Change": "green",
 *       "Systems & Automation": "green",
 *       "People Management": "amber",
 *       "Service & Reputation": "green",
 *       "Selling & Salespeople": "red",
 *       "Marketing & Leads": "amber"
 *   });
 */

const DiagramGenerator = (function() {
    // Colour definitions
    const COLOURS = {
        red: "#E53935",
        amber: "#FFB300",
        green: "#43A047",
        neutral: "#E0E0E0",
        overlap: "#D0D0D0",
    };

    // Circle configuration
    const OUTER_RADIUS = 130;
    const INNER_RADIUS = 85;  // Creates a ~45px band
    const CANVAS_WIDTH = 550;
    const CANVAS_HEIGHT = 520;

    // Circle centres
    const CIRCLE_CENTRES = {
        Cash: { x: 190, y: 180 },
        Capacity: { x: 360, y: 180 },
        Customers: { x: 275, y: 330 },
    };

    // Category labels with positions (centred in each circle)
    const CATEGORY_LABELS = {
        Cash: { x: 190, y: 180 },
        Capacity: { x: 360, y: 180 },
        Customers: { x: 275, y: 330 },
    };

    // Segment names grouped by circle (in order around the outer arc)
    const SEGMENT_ORDER = {
        Cash: ["Financial Control", "Growth Strategy", "Lifestyle & Exit Plan"],
        Capacity: ["Drive Change", "Systems & Automation", "People Management"],
        Customers: ["Marketing & Leads", "Selling & Salespeople", "Service & Reputation"],
    };

    // Arc spans for each circle (angles where the outer non-overlapping arc starts and ends)
    const ARC_SPANS = {
        Cash: { startAngle: 49, endAngle: 251 },
        Capacity: { startAngle: 289, endAngle: 131 },
        Customers: { startAngle: 168, endAngle: 12 },
    };

    /**
     * Find the intersection points of two circles
     */
    function circleIntersections(c1, c2, r) {
        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        
        if (d > 2 * r || d === 0) return null;
        
        const a = d / 2;
        const h = Math.sqrt(r * r - a * a);
        
        const mx = (c1.x + c2.x) / 2;
        const my = (c1.y + c2.y) / 2;
        
        const px = -dy / d;
        const py = dx / d;
        
        return [
            { x: mx + h * px, y: my + h * py },
            { x: mx - h * px, y: my - h * py }
        ];
    }

    /**
     * Normalise angle to 0-360 range
     */
    function normaliseAngle(angle) {
        while (angle < 0) angle += 360;
        while (angle >= 360) angle -= 360;
        return angle;
    }

    /**
     * Generate SVG path for a ring segment (arc band)
     */
    function ringSegmentPath(cx, cy, outerR, innerR, startAngle, endAngle) {
        const startRad = startAngle * (Math.PI / 180);
        const endRad = endAngle * (Math.PI / 180);
        
        let angleDiff = endRad - startRad;
        if (angleDiff < 0) angleDiff += 2 * Math.PI;
        
        const largeArc = angleDiff > Math.PI ? 1 : 0;
        
        const ox1 = cx + outerR * Math.cos(startRad);
        const oy1 = cy - outerR * Math.sin(startRad);
        const ox2 = cx + outerR * Math.cos(endRad);
        const oy2 = cy - outerR * Math.sin(endRad);
        
        const ix1 = cx + innerR * Math.cos(startRad);
        const iy1 = cy - innerR * Math.sin(startRad);
        const ix2 = cx + innerR * Math.cos(endRad);
        const iy2 = cy - innerR * Math.sin(endRad);
        
        return `M ${ox1} ${oy1} A ${outerR} ${outerR} 0 ${largeArc} 0 ${ox2} ${oy2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 1 ${ix1} ${iy1} Z`;
    }

    /**
     * Generate SVG path for lens-shaped overlap between two circles
     */
    function lensPath(c1, c2, r) {
        const intersections = circleIntersections(c1, c2, r);
        if (!intersections) return "";
        
        const [p1, p2] = intersections;
        
        return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} A ${r} ${r} 0 0 0 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
    }

    /**
     * Calculate segment label position
     */
    function segmentLabelPosition(cx, cy, r, startAngle, endAngle) {
        let diff = endAngle - startAngle;
        if (diff < 0) diff += 360;
        
        let midAngle = normaliseAngle(startAngle + diff / 2);
        
        const midRad = midAngle * (Math.PI / 180);
        const labelR = r + 25;
        
        return {
            x: cx + labelR * Math.cos(midRad),
            y: cy - labelR * Math.sin(midRad),
            angle: midAngle
        };
    }

    /**
     * Escape special XML characters
     */
    function escapeXml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    /**
     * Wrap text into lines for multi-line labels
     */
    function wrapText(text, maxChars) {
        maxChars = maxChars || 12;
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (currentLine && (currentLine + ' ' + word).length > maxChars) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = currentLine ? currentLine + ' ' + word : word;
            }
        }
        if (currentLine) lines.push(currentLine);
        
        return lines;
    }

    /**
     * Determine text anchor based on angle position
     */
    function getTextAnchor(angle) {
        const a = normaliseAngle(angle);
        if (a >= 315 || a < 45) return "start";
        if (a >= 45 && a < 135) return "middle";
        if (a >= 135 && a < 225) return "end";
        return "middle";
    }

    /**
     * Generate the complete SVG diagram
     * 
     * @param {Object} scores - Object mapping segment names to colours ("red", "amber", "green")
     * @returns {string} SVG string
     */
    function generate(scores) {
        // Validate input
        const requiredSegments = [
            "Financial Control", "Growth Strategy", "Lifestyle & Exit Plan",
            "Drive Change", "Systems & Automation", "People Management",
            "Service & Reputation", "Selling & Salespeople", "Marketing & Leads"
        ];
        
        const missing = requiredSegments.filter(function(s) { return !(s in scores); });
        if (missing.length > 0) {
            throw new Error('Missing segment scores: ' + missing.join(', '));
        }
        
        const invalidColours = [];
        for (var key in scores) {
            if (scores.hasOwnProperty(key)) {
                var val = scores[key];
                if (["red", "amber", "green"].indexOf(val) === -1) {
                    invalidColours.push(key + ': ' + val);
                }
            }
        }
        if (invalidColours.length > 0) {
            throw new Error('Invalid colours (must be red/amber/green): ' + invalidColours.join(', '));
        }
        
        const parts = [];
        
        // SVG header
        parts.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + CANVAS_WIDTH + ' ' + CANVAS_HEIGHT + '" width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '">');
        parts.push('  <defs>');
        parts.push('    <style>');
        parts.push('      .category-label { font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #333; }');
        parts.push('      .segment-label { font-family: Arial, sans-serif; font-size: 10px; fill: #555; }');
        parts.push('    </style>');
        parts.push('  </defs>');
        parts.push('  ');
        parts.push('  <!-- Background -->');
        parts.push('  <rect width="100%" height="100%" fill="white"/>');
        parts.push('');
        
        // Layer 1: Base circles (neutral fill)
        parts.push('  <!-- Base circles -->');
        for (var name in CIRCLE_CENTRES) {
            if (CIRCLE_CENTRES.hasOwnProperty(name)) {
                var centre = CIRCLE_CENTRES[name];
                parts.push('  <circle cx="' + centre.x + '" cy="' + centre.y + '" r="' + OUTER_RADIUS + '" fill="' + COLOURS.neutral + '"/>');
            }
        }
        parts.push('');
        
        // Layer 2: Coloured ring segments
        parts.push('  <!-- Coloured segments -->');
        
        for (var circleKey in SEGMENT_ORDER) {
            if (SEGMENT_ORDER.hasOwnProperty(circleKey)) {
                var segments = SEGMENT_ORDER[circleKey];
                var centre = CIRCLE_CENTRES[circleKey];
                var arcSpan = ARC_SPANS[circleKey];
                var startAngle = arcSpan.startAngle;
                var endAngle = arcSpan.endAngle;
                
                var totalArc = endAngle - startAngle;
                if (totalArc <= 0) totalArc += 360;
                
                var segmentArc = totalArc / 3;
                
                for (var i = 0; i < segments.length; i++) {
                    var segName = segments[i];
                    var segStart = normaliseAngle(startAngle + i * segmentArc);
                    var segEnd = normaliseAngle(startAngle + (i + 1) * segmentArc);
                    
                    var colour = COLOURS[scores[segName]];
                    var path = ringSegmentPath(centre.x, centre.y, OUTER_RADIUS, INNER_RADIUS, segStart, segEnd);
                    parts.push('  <path d="' + path + '" fill="' + colour + '"/>');
                }
            }
        }
        parts.push('');
        
        // Layer 3: Overlap regions
        parts.push('  <!-- Overlap regions -->');
        var circleKeys = Object.keys(CIRCLE_CENTRES);
        for (var i = 0; i < circleKeys.length; i++) {
            for (var j = i + 1; j < circleKeys.length; j++) {
                var c1 = CIRCLE_CENTRES[circleKeys[i]];
                var c2 = CIRCLE_CENTRES[circleKeys[j]];
                var lens = lensPath(c1, c2, OUTER_RADIUS);
                if (lens) {
                    parts.push('  <path d="' + lens + '" fill="' + COLOURS.overlap + '"/>');
                }
            }
        }
        parts.push('');
        
        // Layer 4: Circle outlines
        parts.push('  <!-- Circle outlines -->');
        for (var name in CIRCLE_CENTRES) {
            if (CIRCLE_CENTRES.hasOwnProperty(name)) {
                var centre = CIRCLE_CENTRES[name];
                parts.push('  <circle cx="' + centre.x + '" cy="' + centre.y + '" r="' + OUTER_RADIUS + '" fill="none" stroke="#888" stroke-width="2"/>');
            }
        }
        parts.push('');
        
        // Layer 5: Category labels
        parts.push('  <!-- Category labels -->');
        for (var name in CATEGORY_LABELS) {
            if (CATEGORY_LABELS.hasOwnProperty(name)) {
                var pos = CATEGORY_LABELS[name];
                parts.push('  <text x="' + pos.x + '" y="' + pos.y + '" class="category-label" text-anchor="middle">' + name + '</text>');
            }
        }
        parts.push('');
        
        // Layer 6: Segment labels
        parts.push('  <!-- Segment labels -->');
        for (var circleKey in SEGMENT_ORDER) {
            if (SEGMENT_ORDER.hasOwnProperty(circleKey)) {
                var segments = SEGMENT_ORDER[circleKey];
                var centre = CIRCLE_CENTRES[circleKey];
                var arcSpan = ARC_SPANS[circleKey];
                var startAngle = arcSpan.startAngle;
                var endAngle = arcSpan.endAngle;
                
                var totalArc = endAngle - startAngle;
                if (totalArc <= 0) totalArc += 360;
                
                var segmentArc = totalArc / 3;
                
                for (var i = 0; i < segments.length; i++) {
                    var segName = segments[i];
                    var segStart = normaliseAngle(startAngle + i * segmentArc);
                    var segEnd = normaliseAngle(startAngle + (i + 1) * segmentArc);
                    
                    var labelPos = segmentLabelPosition(centre.x, centre.y, OUTER_RADIUS, segStart, segEnd);
                    var anchor = getTextAnchor(labelPos.angle);
                    var lines = wrapText(segName, 12);
                    
                    if (lines.length === 1) {
                        parts.push('  <text x="' + labelPos.x.toFixed(1) + '" y="' + labelPos.y.toFixed(1) + '" class="segment-label" text-anchor="' + anchor + '">' + escapeXml(segName) + '</text>');
                    } else {
                        var tspans = '';
                        for (var li = 0; li < lines.length; li++) {
                            if (li === 0) {
                                tspans += '<tspan x="' + labelPos.x.toFixed(1) + '" y="' + labelPos.y.toFixed(1) + '">' + escapeXml(lines[li]) + '</tspan>';
                            } else {
                                tspans += '<tspan x="' + labelPos.x.toFixed(1) + '" dy="12">' + escapeXml(lines[li]) + '</tspan>';
                            }
                        }
                        parts.push('  <text class="segment-label" text-anchor="' + anchor + '">' + tspans + '</text>');
                    }
                }
            }
        }
        parts.push('');
        
        parts.push('</svg>');
        
        return parts.join('\n');
    }

    /**
     * Generate diagram as base64 data URI
     * 
     * @param {Object} scores - Object mapping segment names to colours
     * @returns {string} Data URI string
     */
    function generateBase64(scores) {
        const svg = generate(scores);
        // Browser environment
        if (typeof btoa !== 'undefined') {
            const base64 = btoa(unescape(encodeURIComponent(svg)));
            return 'data:image/svg+xml;base64,' + base64;
        } 
        // Node.js environment
        else if (typeof Buffer !== 'undefined') {
            const base64 = Buffer.from(svg).toString('base64');
            return 'data:image/svg+xml;base64,' + base64;
        }
        return null;
    }

    /**
     * Build scores object from area results
     * Helper function to convert from app's areaScores format
     * 
     * @param {Object} areaScores - Object from ScoringEngine with area scores
     * @returns {Object} Scores object for diagram generator
     */
    function buildScoresFromResults(areaScores) {
        const scores = {};
        for (var areaId in areaScores) {
            if (areaScores.hasOwnProperty(areaId)) {
                var area = areaScores[areaId];
                scores[area.name] = area.status;
            }
        }
        return scores;
    }

    // Public API
    return {
        generate: generate,
        generateBase64: generateBase64,
        buildScoresFromResults: buildScoresFromResults
    };
})();

// For Node.js / Netlify functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiagramGenerator;
}
