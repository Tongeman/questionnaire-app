/**
 * X2 Method - Results Renderer
 * Builds the results display after diagnostic completion
 */

const ResultsRenderer = {
    /**
     * Render the complete results screen
     * @param {Object} results - Calculated results from ScoringEngine
     * @param {Object} contextAnswers - User's context answers
     */
    renderResults(results, contextAnswers) {
        this.renderDiagram(results.areaScores);
        this.renderContextSummary(contextAnswers);
        this.renderResultsGrid(results.areaScores);
    },
    
    /**
     * Render the diagnostic diagram
     * @param {Object} areaScores - All area scores
     */
    renderDiagram(areaScores) {
        // Build scores object for diagram generator
        const scores = DiagramGenerator.buildScoresFromResults(areaScores);
        
        // Generate SVG
        const svgString = DiagramGenerator.generate(scores);
        
        // Insert diagram into the page
        const diagramContainer = document.getElementById('diagramContainer');
        if (diagramContainer) {
            diagramContainer.innerHTML = svgString;
        }
    },
    
    /**
     * Render the business context summary
     * @param {Object} contextAnswers - User's context answers
     */
    renderContextSummary(contextAnswers) {
        const container = document.getElementById('contextSummary');
        
        const revenueLabel = REVENUE_LABELS[contextAnswers.annual_revenue] || contextAnswers.annual_revenue;
        const hoursLabel = HOURS_LABELS[contextAnswers.hours_per_week] || contextAnswers.hours_per_week;
        
        container.innerHTML = `
            <h3>Your Business Profile</h3>
            <p><strong>Name:</strong> ${this.escapeHtml(contextAnswers.name)}</p>
            <p><strong>Business:</strong> ${this.escapeHtml(contextAnswers.business_name)}</p>
            <p><strong>What you do:</strong> ${this.escapeHtml(contextAnswers.business_description)}</p>
            <p><strong>Annual Revenue:</strong> ${revenueLabel}</p>
            <p><strong>Hours per Week:</strong> ${hoursLabel}</p>
        `;
    },
    
    /**
     * Render the results grid with all 9 areas
     * @param {Object} areaScores - All area scores
     */
    renderResultsGrid(areaScores) {
        const container = document.getElementById('resultsGrid');
        
        // Get areas in fixed order (as per AREA_DEFINITIONS)
        const orderedAreas = ScoringEngine.getAreasInFixedOrder(areaScores);
        
        // Render opening text
        const openingHtml = `
            <div class="report-section report-opening">
                <h3>Introduction</h3>
                <p>${REPORT_OPENING}</p>
            </div>
        `;
        
        // Render legend
        const legendHtml = `
            <div class="score-legend">
                <div class="legend-item">
                    <span class="legend-dot red"></span>
                    <span>Needs Attention (5-11)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot amber"></span>
                    <span>Room to Improve (12-18)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot green"></span>
                    <span>Functioning Well (19-25)</span>
                </div>
            </div>
        `;
        
        // Render each area card
        const cardsHtml = orderedAreas.map(area => this.renderAreaCard(area)).join('');
        
        // Render closing text
        const closingHtml = `
            <div class="report-section report-closing">
                <h3>Summary</h3>
                <p>${REPORT_CLOSING}</p>
            </div>
        `;
        
        container.innerHTML = openingHtml + legendHtml + cardsHtml + closingHtml;
    },
    
    /**
     * Render a single area result card
     * @param {Object} area - Area score data
     * @returns {string} HTML string
     */
    renderAreaCard(area) {
        return `
            <div class="result-card status-${area.status}" data-area-id="${area.areaId}">
                <div class="result-card-header">
                    <div class="result-card-title">
                        <span class="status-badge ${area.status}">${area.status.toUpperCase()}</span>
                        <h4>${area.name}</h4>
                    </div>
                    <div class="result-card-score">${area.score}/25</div>
                </div>
                <div class="result-card-body">
                    <p><strong>${area.chaosName}:</strong> ${area.description}</p>
                </div>
            </div>
        `;
    },
    
    /**
     * Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    /**
     * Generate markdown version of results for email
     * @param {Object} results - Calculated results
     * @param {Object} contextAnswers - Context answers
     * @returns {string} Markdown string
     */
    generateResultsMarkdown(results, contextAnswers) {
        const revenueLabel = REVENUE_LABELS[contextAnswers.annual_revenue] || contextAnswers.annual_revenue;
        const hoursLabel = HOURS_LABELS[contextAnswers.hours_per_week] || contextAnswers.hours_per_week;
        
        let markdown = `# Your X2 Business Growth Diagnostic Results\n\n`;
        
        // Business Profile
        markdown += `## Your Business Profile\n\n`;
        markdown += `**Name:** ${contextAnswers.name}\n`;
        markdown += `**Business:** ${contextAnswers.business_name}\n`;
        markdown += `**What you do:** ${contextAnswers.business_description}\n`;
        markdown += `**Annual Revenue:** ${revenueLabel}\n`;
        markdown += `**Hours per Week:** ${hoursLabel}\n\n`;
        
        // Opening paragraph
        markdown += `## Introduction\n\n`;
        markdown += `${REPORT_OPENING}\n\n`;
        
        // All Areas
        markdown += `## All Nine Areas\n\n`;
        
        const orderedAreas = ScoringEngine.getAreasInFixedOrder(results.areaScores);
        
        for (const area of orderedAreas) {
            const statusEmoji = area.status === 'red' ? '🔴' : area.status === 'amber' ? '🟡' : '🟢';
            markdown += `### ${statusEmoji} ${area.name} (${area.score}/25)\n\n`;
            markdown += `**Status:** ${area.statusLabel}\n\n`;
            markdown += `**${area.chaosName}:** ${area.description}\n\n`;
        }
        
        // Statistics summary
        const health = results.overallHealth;
        markdown += `## Your Results at a Glance\n\n`;
        markdown += `* **Areas needing urgent attention (Red):** ${health.statusCounts.red}\n`;
        markdown += `* **Areas with room for improvement (Amber):** ${health.statusCounts.amber}\n`;
        markdown += `* **Areas functioning well (Green):** ${health.statusCounts.green}\n\n`;
        
        // Closing paragraph
        markdown += `## Summary\n\n`;
        markdown += `${REPORT_CLOSING}\n\n`;
        
        markdown += `---\n\n`;
        markdown += `*This diagnostic was generated by the X2 Method. For more information on how to address your constraints, visit [x2method.com](https://x2method.com)*\n`;
        
        return markdown;
    }
};
