/**
 * Business Assessment Diagram Generator - Server Version
 * For use in Netlify Functions (Node.js environment)
 */

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
const INNER_RADIUS = 85;
const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 520;

// Circle centres
const CIRCLE_CENTRES = {
    Cash: { x: 190, y: 180 },
    Capacity: { x: 360, y: 180 },
    Customers: { x: 275, y: 330 },
};

// Category labels with positions
const CATEGORY_LABELS = {
    Cash: { x: 190, y: 180 },
    Capacity: { x: 360, y: 180 },
    Customers: { x: 275, y: 330 },
};

// Segment names grouped by circle
const SEGMENT_ORDER = {
    Cash: ["Financial Control", "Growth Strategy", "Lifestyle & Exit Plan"],
    Capacity: ["Drive Change", "Systems & Automation", "People Management"],
    Customers: ["Marketing & Leads", "Selling & Salespeople", "Service & Reputation"],
};

// Arc spans for each circle
const ARC_SPANS = {
    Cash: { startAngle: 49, endAngle: 251 },
    Capacity: { startAngle: 289, endAngle: 131 },
    Customers: { startAngle: 168, endAngle: 12 },
};

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

function normaliseAngle(angle) {
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    return angle;
}

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

function lensPath(c1, c2, r) {
    const intersections = circleIntersections(c1, c2, r);
    if (!intersections) return "";
    
    const [p1, p2] = intersections;
    
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} A ${r} ${r} 0 0 0 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

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

function escapeXml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars = 12) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
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

function getTextAnchor(angle) {
    const a = normaliseAngle(angle);
    if (a >= 315 || a < 45) return "start";
    if (a >= 45 && a < 135) return "middle";
    if (a >= 135 && a < 225) return "end";
    return "middle";
}

function generate(scores) {
    const requiredSegments = [
        "Financial Control", "Growth Strategy", "Lifestyle & Exit Plan",
        "Drive Change", "Systems & Automation", "People Management",
        "Service & Reputation", "Selling & Salespeople", "Marketing & Leads"
    ];
    
    const missing = requiredSegments.filter(s => !(s in scores));
    if (missing.length > 0) {
        throw new Error(`Missing segment scores: ${missing.join(', ')}`);
    }
    
    const invalidColours = Object.entries(scores)
        .filter(([k, v]) => !["red", "amber", "green"].includes(v));
    if (invalidColours.length > 0) {
        throw new Error(`Invalid colours: ${invalidColours.map(([k, v]) => `${k}: ${v}`).join(', ')}`);
    }
    
    const parts = [];
    
    parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}">`);
    parts.push(`  <defs>`);
    parts.push(`    <style>`);
    parts.push(`      .category-label { font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; fill: #333; }`);
    parts.push(`      .segment-label { font-family: Arial, sans-serif; font-size: 10px; fill: #555; }`);
    parts.push(`    </style>`);
    parts.push(`  </defs>`);
    parts.push(`  <rect width="100%" height="100%" fill="white"/>`);
    
    // Base circles
    for (const [name, centre] of Object.entries(CIRCLE_CENTRES)) {
        parts.push(`  <circle cx="${centre.x}" cy="${centre.y}" r="${OUTER_RADIUS}" fill="${COLOURS.neutral}"/>`);
    }
    
    // Coloured segments
    for (const [circleKey, segments] of Object.entries(SEGMENT_ORDER)) {
        const centre = CIRCLE_CENTRES[circleKey];
        const { startAngle, endAngle } = ARC_SPANS[circleKey];
        
        let totalArc = endAngle - startAngle;
        if (totalArc <= 0) totalArc += 360;
        
        const segmentArc = totalArc / 3;
        
        for (let i = 0; i < segments.length; i++) {
            const segName = segments[i];
            const segStart = normaliseAngle(startAngle + i * segmentArc);
            const segEnd = normaliseAngle(startAngle + (i + 1) * segmentArc);
            
            const colour = COLOURS[scores[segName]];
            const path = ringSegmentPath(centre.x, centre.y, OUTER_RADIUS, INNER_RADIUS, segStart, segEnd);
            parts.push(`  <path d="${path}" fill="${colour}"/>`);
        }
    }
    
    // Overlap regions
    const circleKeys = Object.keys(CIRCLE_CENTRES);
    for (let i = 0; i < circleKeys.length; i++) {
        for (let j = i + 1; j < circleKeys.length; j++) {
            const c1 = CIRCLE_CENTRES[circleKeys[i]];
            const c2 = CIRCLE_CENTRES[circleKeys[j]];
            const lens = lensPath(c1, c2, OUTER_RADIUS);
            if (lens) {
                parts.push(`  <path d="${lens}" fill="${COLOURS.overlap}"/>`);
            }
        }
    }
    
    // Circle outlines
    for (const [name, centre] of Object.entries(CIRCLE_CENTRES)) {
        parts.push(`  <circle cx="${centre.x}" cy="${centre.y}" r="${OUTER_RADIUS}" fill="none" stroke="#888" stroke-width="2"/>`);
    }
    
    // Category labels
    for (const [name, pos] of Object.entries(CATEGORY_LABELS)) {
        parts.push(`  <text x="${pos.x}" y="${pos.y}" class="category-label" text-anchor="middle">${name}</text>`);
    }
    
    // Segment labels
    for (const [circleKey, segments] of Object.entries(SEGMENT_ORDER)) {
        const centre = CIRCLE_CENTRES[circleKey];
        const { startAngle, endAngle } = ARC_SPANS[circleKey];
        
        let totalArc = endAngle - startAngle;
        if (totalArc <= 0) totalArc += 360;
        
        const segmentArc = totalArc / 3;
        
        for (let i = 0; i < segments.length; i++) {
            const segName = segments[i];
            const segStart = normaliseAngle(startAngle + i * segmentArc);
            const segEnd = normaliseAngle(startAngle + (i + 1) * segmentArc);
            
            const labelPos = segmentLabelPosition(centre.x, centre.y, OUTER_RADIUS, segStart, segEnd);
            const anchor = getTextAnchor(labelPos.angle);
            const lines = wrapText(segName, 12);
            
            if (lines.length === 1) {
                parts.push(`  <text x="${labelPos.x.toFixed(1)}" y="${labelPos.y.toFixed(1)}" class="segment-label" text-anchor="${anchor}">${escapeXml(segName)}</text>`);
            } else {
                const tspans = lines.map((line, idx) => 
                    idx === 0 
                        ? `<tspan x="${labelPos.x.toFixed(1)}" y="${labelPos.y.toFixed(1)}">${escapeXml(line)}</tspan>`
                        : `<tspan x="${labelPos.x.toFixed(1)}" dy="12">${escapeXml(line)}</tspan>`
                ).join('');
                parts.push(`  <text class="segment-label" text-anchor="${anchor}">${tspans}</text>`);
            }
        }
    }
    
    parts.push(`</svg>`);
    
    return parts.join('\n');
}

function buildScoresFromAreaScores(areaScores) {
    const scores = {};
    for (const areaId in areaScores) {
        if (areaScores.hasOwnProperty(areaId)) {
            const area = areaScores[areaId];
            scores[area.name] = area.status;
        }
    }
    return scores;
}

module.exports = {
    generate,
    buildScoresFromAreaScores
};
