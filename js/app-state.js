/**
 * X2 Method - Application State
 * Centralized state management for the diagnostic
 */

const AppState = {
    // Current screen: 'intro', 'context', 'diagnostic', 'email', 'results'
    currentScreen: 'intro',
    
    // Context questions state
    contextIndex: 0,
    contextAnswers: {},
    
    // Diagnostic questions state
    diagnosticIndex: 0,
    diagnosticAnswers: {},
    
    // The order in which areas will be presented (randomised on start)
    areaOrder: [],
    
    // Flattened list of questions in presentation order
    orderedQuestions: [],
    
    // Email captured
    userEmail: '',
    emailConsent: false,
    
    // Calculated results
    results: null,
    
    // Questionnaire version
    questionnaireVersion: 'X2-Diagnostic-v3.0',
    
    /**
     * Initialize or reset the state
     */
    init() {
        this.currentScreen = 'intro';
        this.contextIndex = 0;
        this.contextAnswers = {};
        this.diagnosticIndex = 0;
        this.diagnosticAnswers = {};
        this.userEmail = '';
        this.emailConsent = false;
        this.results = null;
        
        // Randomise the order of areas
        this.areaOrder = this.shuffleArray([...AREA_DEFINITIONS.map(a => a.id)]);
        
        // Build ordered questions list based on randomised areas
        this.orderedQuestions = [];
        for (const areaId of this.areaOrder) {
            const areaQuestions = DIAGNOSTIC_QUESTIONS.filter(q => q.areaId === areaId);
            this.orderedQuestions.push(...areaQuestions);
        }
    },
    
    /**
     * Fisher-Yates shuffle algorithm
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    /**
     * Get current context question
     */
    getCurrentContextQuestion() {
        return CONTEXT_QUESTIONS[this.contextIndex];
    },
    
    /**
     * Get current diagnostic question
     */
    getCurrentDiagnosticQuestion() {
        return this.orderedQuestions[this.diagnosticIndex];
    },
    
    /**
     * Get the area definition for the current diagnostic question
     */
    getCurrentArea() {
        const question = this.getCurrentDiagnosticQuestion();
        if (!question) return null;
        return AREA_DEFINITIONS.find(a => a.id === question.areaId);
    },
    
    /**
     * Save context answer
     */
    saveContextAnswer(questionId, value) {
        this.contextAnswers[questionId] = value;
    },
    
    /**
     * Save diagnostic answer
     */
    saveDiagnosticAnswer(questionId, value) {
        this.diagnosticAnswers[questionId] = parseInt(value, 10);
    },
    
    /**
     * Check if current context question has an answer
     */
    hasContextAnswer() {
        const question = this.getCurrentContextQuestion();
        if (!question) return false;
        const answer = this.contextAnswers[question.id];
        return answer !== undefined && answer !== '';
    },
    
    /**
     * Check if current diagnostic question has an answer
     */
    hasDiagnosticAnswer() {
        const question = this.getCurrentDiagnosticQuestion();
        if (!question) return false;
        return this.diagnosticAnswers[question.id] !== undefined;
    },
    
    /**
     * Navigate context questions
     */
    nextContext() {
        if (this.contextIndex < CONTEXT_QUESTIONS.length - 1) {
            this.contextIndex++;
            return true;
        }
        return false;
    },
    
    prevContext() {
        if (this.contextIndex > 0) {
            this.contextIndex--;
            return true;
        }
        return false;
    },
    
    /**
     * Navigate diagnostic questions
     */
    nextDiagnostic() {
        if (this.diagnosticIndex < this.orderedQuestions.length - 1) {
            this.diagnosticIndex++;
            return true;
        }
        return false;
    },
    
    prevDiagnostic() {
        if (this.diagnosticIndex > 0) {
            this.diagnosticIndex--;
            return true;
        }
        return false;
    },
    
    /**
     * Check if at last context question
     */
    isLastContextQuestion() {
        return this.contextIndex === CONTEXT_QUESTIONS.length - 1;
    },
    
    /**
     * Check if at last diagnostic question
     */
    isLastDiagnosticQuestion() {
        return this.diagnosticIndex === this.orderedQuestions.length - 1;
    },
    
    /**
     * Get context progress percentage
     */
    getContextProgress() {
        return ((this.contextIndex + 1) / CONTEXT_QUESTIONS.length) * 100;
    },
    
    /**
     * Get diagnostic progress percentage
     */
    getDiagnosticProgress() {
        return ((this.diagnosticIndex + 1) / this.orderedQuestions.length) * 100;
    },
    
    /**
     * Get all data for submission
     */
    getSubmissionData() {
        return {
            name: this.contextAnswers.name,
            email: this.userEmail,
            emailConsent: this.emailConsent,
            contextAnswers: this.contextAnswers,
            answers: this.diagnosticAnswers,
            scores: this.results ? this.results.areaScores : null,
            primaryConstraint: this.results ? this.results.primaryConstraint.name : null,
            questionnaireVersion: this.questionnaireVersion
        };
    }
};

// Initialize state on load
AppState.init();
