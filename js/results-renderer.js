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
        this.renderPrimaryConstraint(results.primaryConstraint);
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
     * Render the primary constraint section
     * @param {Object} primaryConstraint - Primary constraint data
     */
    renderPrimaryConstraint(primaryConstraint) {
        const container = document.getElementById('primaryConstraint');
        
        container.innerHTML = `
            <h3>Your Primary Constraint</h3>
            <p class="constraint-name">${primaryConstraint.chaosName}: ${primaryConstraint.name}</p>
            <p>${primaryConstraint.tagline}</p>
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
        
        // Render legend first
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
        
        container.innerHTML = legendHtml + cardsHtml;
        
        // Add click handlers for expanding cards
        this.attachCardExpandHandlers();
    },
    
    /**
     * Render a single area result card
     * @param {Object} area - Area score data
     * @returns {string} HTML string
     */
    renderAreaCard(area) {
        const expandIcon = `
            <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        `;
        
        return `
            <div class="result-card status-${area.status}" data-area-id="${area.areaId}">
                <div class="result-card-header">
                    <div class="result-card-title">
                        <span class="status-badge ${area.status}">${area.status.toUpperCase()}</span>
                        <h4>${area.name}</h4>
                    </div>
                    <div class="result-card-score">${area.score}/25</div>
                    ${expandIcon}
                </div>
                <div class="result-card-body">
                    <p><strong>${area.chaosName}:</strong> ${area.description}</p>
                </div>
            </div>
        `;
    },
    
    /**
     * Attach click handlers for expanding/collapsing cards
     */
    attachCardExpandHandlers() {
        const cards = document.querySelectorAll('.result-card');
        
        cards.forEach(card => {
            const header = card.querySelector('.result-card-header');
            header.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
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
        
        // Primary Constraint
        const pc = results.primaryConstraint;
        markdown += `## Your Primary Constraint\n\n`;
        markdown += `### ${pc.chaosName}: ${pc.name}\n\n`;
        markdown += `${pc.tagline}\n\n`;
        markdown += `**The Shadow:** ${pc.shadow}\n\n`;
        markdown += `**The Chaos:** ${pc.chaos}\n\n`;
        markdown += `**The Crisis (if left unchecked):** ${pc.crisis}\n\n`;
        
        // All Areas
        markdown += `## All Nine Areas\n\n`;
        
        const orderedAreas = ScoringEngine.getAreasInFixedOrder(results.areaScores);
        
        for (const area of orderedAreas) {
            const statusEmoji = area.status === 'red' ? '🔴' : area.status === 'amber' ? '🟡' : '🟢';
            markdown += `### ${statusEmoji} ${area.name} (${area.score}/25)\n\n`;
            markdown += `**Status:** ${area.statusLabel}\n\n`;
            markdown += `${area.description}\n\n`;
        }
        
        // Summary
        const health = results.overallHealth;
        markdown += `## Summary\n\n`;
        markdown += `* **Areas needing urgent attention (Red):** ${health.statusCounts.red}\n`;
        markdown += `* **Areas with room for improvement (Amber):** ${health.statusCounts.amber}\n`;
        markdown += `* **Areas functioning well (Green):** ${health.statusCounts.green}\n\n`;
        
        markdown += `---\n\n`;
        markdown += `*This diagnostic was generated by the X2 Method. For more information on how to address your constraints, visit [x2method.com](https://x2method.com)*\n`;
        
        return markdown;
    }
};
