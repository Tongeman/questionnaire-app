/**
 * X2 Method - Scoring Engine
 * Calculates scores for each area and determines RAG status
 */

const ScoringEngine = {
    /**
     * Calculate scores for all 9 areas
     * @param {Object} answers - Object mapping question IDs to scores (1-5)
     * @returns {Object} Results with area scores and primary constraint
     */
    calculateResults(answers) {
        const areaScores = {};
        
        // Calculate score for each area
        for (const area of AREA_DEFINITIONS) {
            const areaQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.areaId === area.id);
            const areaAnswers = areaQuestions.map(q => answers[q.id] || 0);
            const totalScore = areaAnswers.reduce((sum, score) => sum + score, 0);
            
            areaScores[area.id] = {
                areaId: area.id,
                name: area.name,
                chaosName: area.chaosName,
                score: totalScore,
                maxScore: 15,
                percentage: Math.round((totalScore / 15) * 100),
                status: this.getStatus(totalScore),
                statusLabel: this.getStatusLabel(totalScore),
                description: this.getDescription(area, totalScore)
            };
        }
        
        // Find primary constraint (lowest scoring area)
        const primaryConstraint = this.findPrimaryConstraint(areaScores);
        
        return {
            areaScores,
            primaryConstraint,
            overallHealth: this.calculateOverallHealth(areaScores)
        };
    },
    
    /**
     * Determine RAG status based on score
     * @param {number} score - Score out of 15
     * @returns {string} 'red', 'amber', or 'green'
     */
    getStatus(score) {
        if (score <= SCORE_THRESHOLDS.red.max) return 'red';
        if (score <= SCORE_THRESHOLDS.amber.max) return 'amber';
        return 'green';
    },
    
    /**
     * Get human-readable status label
     * @param {number} score - Score out of 15
     * @returns {string} Status label
     */
    getStatusLabel(score) {
        const status = this.getStatus(score);
        return STATUS_LABELS[status];
    },
    
    /**
     * Get appropriate description based on status
     * @param {Object} area - Area definition
     * @param {number} score - Score out of 15
     * @returns {string} Description
     */
    getDescription(area, score) {
        const status = this.getStatus(score);
        switch (status) {
            case 'red':
                return area.redDescription;
            case 'amber':
                return area.amberDescription;
            case 'green':
                return area.greenDescription;
            default:
                return area.description;
        }
    },
    
    /**
     * Find the primary constraint (lowest scoring area)
     * @param {Object} areaScores - All area scores
     * @returns {Object} Primary constraint area
     */
    findPrimaryConstraint(areaScores) {
        let lowest = null;
        let lowestScore = Infinity;
        
        for (const areaId in areaScores) {
            if (areaScores[areaId].score < lowestScore) {
                lowestScore = areaScores[areaId].score;
                lowest = areaScores[areaId];
            }
        }
        
        // Get the full area definition for additional context
        const areaDefinition = AREA_DEFINITIONS.find(a => a.id === lowest.areaId);
        
        return {
            ...lowest,
            tagline: areaDefinition.tagline,
            shadow: areaDefinition.shadow,
            chaos: areaDefinition.description,
            crisis: areaDefinition.crisis
        };
    },
    
    /**
     * Calculate overall business health
     * @param {Object} areaScores - All area scores
     * @returns {Object} Overall health metrics
     */
    calculateOverallHealth(areaScores) {
        const scores = Object.values(areaScores);
        const totalScore = scores.reduce((sum, area) => sum + area.score, 0);
        const maxPossible = scores.length * 15;
        const percentage = Math.round((totalScore / maxPossible) * 100);
        
        // Count areas by status
        const statusCounts = {
            red: scores.filter(a => a.status === 'red').length,
            amber: scores.filter(a => a.status === 'amber').length,
            green: scores.filter(a => a.status === 'green').length
        };
        
        return {
            totalScore,
            maxPossible,
            percentage,
            statusCounts
        };
    },
    
    /**
     * Get areas sorted by score (lowest first) - for display
     * @param {Object} areaScores - All area scores
     * @returns {Array} Sorted array of area scores
     */
    getAreasSortedByScore(areaScores) {
        return Object.values(areaScores).sort((a, b) => a.score - b.score);
    },
    
    /**
     * Get areas in fixed order (as defined in AREA_DEFINITIONS)
     * @param {Object} areaScores - All area scores
     * @returns {Array} Array of area scores in fixed order
     */
    getAreasInFixedOrder(areaScores) {
        return AREA_DEFINITIONS.map(area => areaScores[area.id]);
    }
};
