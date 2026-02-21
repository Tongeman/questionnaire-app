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

        container.innerHTML = `
            <h3>Your Business Profile</h3>
            <p><strong>Name:</strong> ${this.escapeHtml(contextAnswers.name)}</p>
            <p><strong>What you do:</strong> ${this.escapeHtml(contextAnswers.business_description)}</p>
            <p><strong>Annual Revenue:</strong> ${revenueLabel}</p>
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
                ${MarkdownParser.parse(REPORT_OPENING)}
            </div>
        `;

        // Render legend
        const legendHtml = `
            <div class="score-legend">
                <div class="legend-item">
                    <span class="legend-dot red"></span>
                    <span>High Growth Potential<br>Quick wins available<br>(0-5)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot amber"></span>
                    <span>Moderate Growth Potential<br>Worth investing time<br>(6-11)</span>
                </div>
                <div class="legend-item">
                    <span class="legend-dot green"></span>
                    <span>Strong Foundation<br>Ready to scale<br>(12-15)</span>
                </div>
            </div>
        `;

        const primaryConstraintHtml = `
            <div class="report-section report-primary-constraint">
                <h3>Your Priority Area</h3>
                <p>Your results reveal a clear priority. The area holding back your growth most right now is: <strong>${areaScores[Object.keys(areaScores).reduce((a, b) => areaScores[a].score < areaScores[b].score ? a : b)].name}</strong></p>
            </div>
        `;
		
        const CardsTitleHtml = `
            <div class="report-section report-primary-constraint">
                <h3>Your Detailed Results For All Nine Business Areas:</h3>
            </div>
        `;

        // Render each area card
        const cardsHtml = orderedAreas.map(area => this.renderAreaCard(area)).join('');

        // Render statistics summary
        const health = ScoringEngine.calculateOverallHealth(areaScores);
        const summaryHtml = `
            <div class="report-section report-summary">
                <h3>Your Results at a Glance</h3>
                <p><strong>High Growth Potential:</strong> - Quick wins available ${health.statusCounts.red}</p>
                <p><strong>Moderate Growth Potential:</strong> - Worth investing time ${health.statusCounts.amber}</p>
                <p><strong>Strong Foundation:</strong> - Ready to scale ${health.statusCounts.green}</p>
            </div>
        `;

        // Render closing text
        const closingHtml = `
            <div class="report-section report-closing">
                <h3>What Happens Next</h3>
                ${MarkdownParser.parse(REPORT_CLOSING)}
            </div>
        `;

        // Render bio
        const bioHtml = `
            <div class="report-section report-bio">
                ${MarkdownParser.parse(REPORT_BIO)}
            </div>
        `;

        container.innerHTML = openingHtml + legendHtml + primaryConstraintHtml + CardsTitleHtml + cardsHtml + summaryHtml + closingHtml + bioHtml;
    },

    /**
     * Render a single area result card
     * @param {Object} area - Area score data
     * @returns {string} HTML string
     */
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
    <p><strong>Potential Chaos - ${area.chaosName}:</strong> ${area.description}</p>
    ${area.videoUrl ? `
    <div class="video-link-container">
        <a href="${area.videoUrl}" target="_blank" rel="noopener noreferrer" class="video-link">
            Learn more about ${area.chaosName} →
        </a>
    </div>
    ` : ''}
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

        let markdown = `# Your X2 Business Growth Scorecard\nPersonalised Results for ${contextAnswers.name}\n\n`;

        // Business Profile
        markdown += `## Your Business Profile\n\n`;
        markdown += `**Name:** ${contextAnswers.name}\n\n`;
        markdown += `**What you do:** ${contextAnswers.business_description}\n\n`;
        markdown += `**Revenue:** ${revenueLabel}\n\n`;

        // Opening paragraph
        markdown += `## Introduction\n\n`;
        markdown += `${REPORT_OPENING}\n\n`;

        const primaryConstraintName = Object.keys(results.areaScores).reduce((a, b) => results.areaScores[a].score < results.areaScores[b].score ? a : b);
        markdown += `## Your Priority Area\n\n`;
        markdown += `Your results reveal a clear priority. The area holding back your growth most right now is: **${results.areaScores[primaryConstraintName].name}**\n\n`;
		
        // All Areas
        markdown += `## Your Detailed Results For All Nine Business Areas\n\n`;

        const orderedAreas = ScoringEngine.getAreasInFixedOrder(results.areaScores);

        for (const area of orderedAreas) {
            const statusEmoji = area.status === 'red' ? '🔴' : area.status === 'amber' ? '🟡' : '🟢';
            markdown += `### ${statusEmoji} ${area.name} (${area.score}/15)\n`;
            markdown += `**Status:** ${area.statusLabel}\n\n`;
            markdown += `**Potential Chaos - ${area.chaosName}:** ${area.description}\n\n`;
            if (area.videoUrl) {
                markdown += `**Learn more:** [Watch video about ${area.chaosName}](${area.videoUrl})\n\n`;
            }
        }

        // Statistics summary
        const health = results.overallHealth;
        markdown += `## Your Results at a Glance\n\n`;
        markdown += `**Areas with High Growth Potential - Quick wins available:** ${health.statusCounts.red}\n\n`;
        markdown += `**Areas with Moderate Growth Potential - Worth investing time:** ${health.statusCounts.amber}\n\n`;
        markdown += `**Areas with a Strong Foundation:** - Ready to scale ${health.statusCounts.green}\n\n`;

        // Closing paragraph
        markdown += `## What Happens Next\n\n`;
        markdown += `${REPORT_CLOSING}\n\n`;

        markdown += `---\n\n`;

        // Bio
        markdown += `${REPORT_BIO}\n\n`;

        markdown += `---\n\n`;
        markdown += `*This scorecard was generated by the X2 Method. For more information, visit [x2method.com](https://x2method.com)*\n`;

        return markdown;
    }
};
