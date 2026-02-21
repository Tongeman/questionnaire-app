/**
 * X2 Method - UI Renderer
 * Handles all DOM manipulation and screen rendering
 */

const UIRenderer = {
    // Screen element IDs
    screens: {
        intro: 'introScreen',
        context: 'contextScreen',
        transition: 'transitionScreen',
        diagnostic: 'diagnosticScreen',
        email: 'emailScreen',
        results: 'resultsScreen'
    },

    /**
     * Show a specific screen, hiding all others
     * @param {string} screenName - Name of screen to show
     */
    showScreen(screenName) {
        for (const [name, id] of Object.entries(this.screens)) {
            const element = document.getElementById(id);
            if (element) {
                if (name === screenName) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            }
        }

        // Scroll to top
        window.scrollTo(0, 0);
    },

    /**
     * Show/hide loading overlay
     * @param {boolean} show - Whether to show the overlay
     * @param {string} message - Optional loading message
     */
    showLoading(show, message = 'Analysing your results...') {
        const overlay = document.getElementById('loadingOverlay');
        const messageEl = overlay.querySelector('.loading-message');

        if (messageEl) {
            messageEl.textContent = message;
        }

        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    },

    /**
     * Render a context question
     * @param {Object} question - Question object
     * @param {*} currentAnswer - Current answer value if any
     */
    renderContextQuestion(question, currentAnswer) {
        const container = document.getElementById('contextQuestionContainer');

        let inputHtml = '';

        switch (question.type) {
        case 'text':
            inputHtml = `
                    <input 
                        type="text" 
                        id="contextInput" 
                        class="text-input" 
                        placeholder="${question.placeholder || ''}"
                        value="${currentAnswer || ''}"
                        ${question.required ? 'required' : ''}
                    >
                `;
            break;

        case 'textarea':
            inputHtml = `
                    <textarea 
                        id="contextInput" 
                        class="text-input" 
                        placeholder="${question.placeholder || ''}"
                        ${question.required ? 'required' : ''}
                    >${currentAnswer || ''}</textarea>
                `;
            break;

        case 'select':
            const optionsHtml = question.options.map(opt => `
                    <option value="${opt.value}" ${currentAnswer === opt.value ? 'selected' : ''}>
                        ${opt.label}
                    </option>
                `).join('');

            inputHtml = `
                    <select id="contextInput" class="select-input" ${question.required ? 'required' : ''}>
                        ${optionsHtml}
                    </select>
                `;
            break;
        }

        container.innerHTML = `
            <p class="question-text">${question.text}</p>
            ${inputHtml}
        `;

        // Add event listener for enabling/disabling next button
        const input = document.getElementById('contextInput');
        input.addEventListener('input', () => {
            this.updateContextNextButton();
        });
        input.addEventListener('change', () => {
            this.updateContextNextButton();

            // Auto-advance for select dropdowns after selection
            if (question.type === 'select' && input.value) {
                setTimeout(() => {
                    nextContextQuestion();
                }, 300);
            }
        });

        // Focus the input
        input.focus();

        // Update button state
        this.updateContextNextButton();
    },

    /**
     * Update context progress bar and text
     */
    updateContextProgress() {
        const progress = AppState.getContextProgress();
        const progressBar = document.getElementById('contextProgressBar');
        const progressText = document.getElementById('contextProgressText');

        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${AppState.contextIndex + 1} of 30`;
    },

    /**
     * Update context navigation buttons
     */
    updateContextButtons() {
        const prevBtn = document.getElementById('contextPrevBtn');
        const nextBtn = document.getElementById('contextNextBtn');

        prevBtn.disabled = AppState.contextIndex === 0;

        if (AppState.isLastContextQuestion()) {
            nextBtn.innerHTML = 'Start Diagnostic <span class="btn-arrow">→</span>';
        } else {
            nextBtn.innerHTML = 'Next <span class="btn-arrow">→</span>';
        }

        this.updateContextNextButton();
    },

    /**
     * Update context next button enabled state
     */
    updateContextNextButton() {
        const nextBtn = document.getElementById('contextNextBtn');
        const input = document.getElementById('contextInput');

        if (input) {
            const hasValue = input.value && input.value.trim() !== '';
            nextBtn.disabled = !hasValue;
        }
    },

    /**
     * Get current context input value
     * @returns {string} Current input value
     */
    getContextInputValue() {
        const input = document.getElementById('contextInput');
        return input ? input.value.trim() : '';
    },

    /**
     * Render a diagnostic question with 1-5 scale
     * @param {Object} question - Question object
     * @param {number} currentAnswer - Current answer value if any
     */
    renderDiagnosticQuestion(question, currentAnswer) {
        const container = document.getElementById('diagnosticQuestionContainer');

        const scaleOptionsHtml = [1, 2, 3, 4, 5].map(value => {
            const isSelected = currentAnswer === value;
            const label = question.scaleLabels[value] || `${value}`;

            return `
                <label class="scale-option ${isSelected ? 'selected' : ''}" data-value="${value}">
                    <input type="radio" name="diagnostic" value="${value}" ${isSelected ? 'checked' : ''}>
                    <span class="scale-number">${value}</span>
                    <span class="scale-label">${label}</span>
                </label>
            `;
        }).join('');

        container.innerHTML = `
            <p class="question-text">${question.text}</p>
            <div class="scale-options">
                ${scaleOptionsHtml}
            </div>
        `;

        // Add event listeners to scale options
        const options = container.querySelectorAll('.scale-option');
        options.forEach(option => {
            option.addEventListener('click', (event) => {
                event.stopPropagation();

                // Only proceed if not already selected (prevents double-firing)
                if (option.classList.contains('selected')) {
                    return;
                }

                // Remove selected from all
                options.forEach(opt => opt.classList.remove('selected'));
                // Add selected to clicked
                option.classList.add('selected');
                // Check the radio
                option.querySelector('input').checked = true;
                // Update button state
                this.updateDiagnosticNextButton();

                // Auto-advance to next question after a brief delay
                // This gives the user visual feedback of their selection
                setTimeout(() => {
                    nextDiagnosticQuestion();
                }, 300);
            });
        });

        // Update button state
        this.updateDiagnosticNextButton();
    },

    /**
     * Update diagnostic progress bar and text
     */
    updateDiagnosticProgress() {
        const progress = AppState.getDiagnosticProgress();
        const progressBar = document.getElementById('diagnosticProgressBar');
        const progressText = document.getElementById('diagnosticProgressText');

        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Question ${AppState.diagnosticIndex + 4} of 30`;

        // Update area name
        const area = AppState.getCurrentArea();
        const areaNameEl = document.getElementById('currentAreaName');
        if (area && areaNameEl) {
            areaNameEl.textContent = area.name;
        }
    },

    /**
     * Update diagnostic navigation buttons
     */
    updateDiagnosticButtons() {
        const prevBtn = document.getElementById('diagnosticPrevBtn');
        const nextBtn = document.getElementById('diagnosticNextBtn');

        prevBtn.disabled = AppState.diagnosticIndex === 0;

        if (AppState.isLastDiagnosticQuestion()) {
            nextBtn.innerHTML = 'See My Results <span class="btn-arrow">→</span>';
        } else {
            nextBtn.innerHTML = 'Next <span class="btn-arrow">→</span>';
        }

        this.updateDiagnosticNextButton();
    },

    /**
     * Update diagnostic next button enabled state
     */
    updateDiagnosticNextButton() {
        const nextBtn = document.getElementById('diagnosticNextBtn');
        const selectedOption = document.querySelector('.scale-option.selected');
        nextBtn.disabled = !selectedOption;
    },

    /**
     * Get selected diagnostic answer
     * @returns {number|null} Selected value or null
     */
    getDiagnosticSelectedValue() {
        const selectedOption = document.querySelector('.scale-option.selected');
        return selectedOption ? parseInt(selectedOption.dataset.value, 10) : null;
    }
};
