/**
 * X2 Method - Main Application Controller
 * Handles flow control, navigation, and API calls
 */

// ============================================================================
// NAVIGATION FUNCTIONS
// ============================================================================

/**
 * Start the diagnostic from intro screen
 */
function startDiagnostic() {
    AppState.init(); // Reset state
    AppState.currentScreen = 'context';
    
    UIRenderer.showScreen('context');
    showCurrentContextQuestion();
}

/**
 * Show current context question
 */
function showCurrentContextQuestion() {
    const question = AppState.getCurrentContextQuestion();
    const currentAnswer = AppState.contextAnswers[question.id];
    
    UIRenderer.renderContextQuestion(question, currentAnswer);
    UIRenderer.updateContextProgress();
    UIRenderer.updateContextButtons();
}

/**
 * Navigate to next context question or diagnostic
 */
function nextContextQuestion() {
    // Save current answer
    const question = AppState.getCurrentContextQuestion();
    const value = UIRenderer.getContextInputValue();
    AppState.saveContextAnswer(question.id, value);
    
    if (AppState.isLastContextQuestion()) {
        // Move to diagnostic
        showTransitionScreen();;
    } else {
        AppState.nextContext();
        showCurrentContextQuestion();
    }
}

/**
 * Navigate to previous context question
 */
function previousContextQuestion() {
    // Save current answer before going back
    const question = AppState.getCurrentContextQuestion();
    const value = UIRenderer.getContextInputValue();
    AppState.saveContextAnswer(question.id, value);
    
    AppState.prevContext();
    showCurrentContextQuestion();
}

function showTransitionScreen() {
    AppState.currentScreen = 'transition';
    UIRenderer.showScreen('transition');
}

/**
 * Start the diagnostic questions
 */
function startDiagnosticQuestions() {
    AppState.currentScreen = 'diagnostic';
    UIRenderer.showScreen('diagnostic');
    showCurrentDiagnosticQuestion();
}

/**
 * Show current diagnostic question
 */
function showCurrentDiagnosticQuestion() {
    const question = AppState.getCurrentDiagnosticQuestion();
    const currentAnswer = AppState.diagnosticAnswers[question.id];
    
    UIRenderer.renderDiagnosticQuestion(question, currentAnswer);
    UIRenderer.updateDiagnosticProgress();
    UIRenderer.updateDiagnosticButtons();
}

/**
 * Navigate to next diagnostic question or email capture
 */
function nextDiagnosticQuestion() {
    // Save current answer
    const question = AppState.getCurrentDiagnosticQuestion();
    const value = UIRenderer.getDiagnosticSelectedValue();
    
    if (value !== null) {
        AppState.saveDiagnosticAnswer(question.id, value);
    }
    
    if (AppState.isLastDiagnosticQuestion()) {
        // Move to email capture
        showEmailCapture();
    } else {
        AppState.nextDiagnostic();
        showCurrentDiagnosticQuestion();
    }
}

/**
 * Navigate to previous diagnostic question
 */
function previousDiagnosticQuestion() {
    // Save current answer before going back
    const question = AppState.getCurrentDiagnosticQuestion();
    const value = UIRenderer.getDiagnosticSelectedValue();
    
    if (value !== null) {
        AppState.saveDiagnosticAnswer(question.id, value);
    }
    
    AppState.prevDiagnostic();
    showCurrentDiagnosticQuestion();
}

/**
 * Show email capture screen
 */
function showEmailCapture() {
    AppState.currentScreen = 'email';
    UIRenderer.showScreen('email');
}

/**
 * Handle email form submission
 * @param {Event} event - Form submit event
 */
async function submitEmail(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('userEmail');
    const consentInput = document.getElementById('emailConsent');
    
    AppState.userEmail = emailInput.value.trim();
    AppState.emailConsent = consentInput.checked;
    
    // Show loading
    UIRenderer.showLoading(true, 'Calculating your results...');
    
    try {
        // Calculate results
        AppState.results = ScoringEngine.calculateResults(AppState.diagnosticAnswers);
        
        // Submit to backend
        await submitToBackend();
        
        // Show results
        showResults();
    } catch (error) {
        console.error('Error submitting diagnostic:', error);
        alert('There was an error saving your results. Your results will still be displayed.');
        showResults();
    } finally {
        UIRenderer.showLoading(false);
    }
}

/**
 * Show results screen
 */
function showResults() {
    AppState.currentScreen = 'results';
    UIRenderer.showScreen('results');
    
    ResultsRenderer.renderResults(AppState.results, AppState.contextAnswers);
}

/**
 * Reset and start over
 */
function resetDiagnostic() {
    AppState.init();
    UIRenderer.showScreen('intro');
    
    // Reset email sent message
    const emailSentMsg = document.getElementById('emailSentMessage');
    if (emailSentMsg) {
        emailSentMsg.classList.add('hidden');
    }
    
    // Reset send email button
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    if (sendEmailBtn) {
        sendEmailBtn.disabled = false;
        sendEmailBtn.textContent = 'Send Results to My Email';
    }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Submit diagnostic results to backend
 */
async function submitToBackend() {
    const data = {
        name: AppState.contextAnswers.name,
        email: AppState.userEmail,
        emailConsent: AppState.emailConsent,
        contextAnswers: AppState.contextAnswers,
        answers: AppState.diagnosticAnswers,
        scores: AppState.results.areaScores,
        primaryConstraint: AppState.results.primaryConstraint.name,
        questionnaireVersion: AppState.questionnaireVersion
    };
    
    try {
        // Submit to Supabase
        const response = await fetch('/.netlify/functions/submit-diagnostic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit diagnostic');
        }
        
        const result = await response.json();
        console.log('Diagnostic submitted successfully:', result);
        
        // Add to Encharge (separate call to not block results)
        addToEncharge(data);
        
        return result;
    } catch (error) {
        console.error('Error submitting to backend:', error);
        throw error;
    }
}

/**
 * Add contact to Encharge with constraint tag
 */
async function addToEncharge(data) {
    try {
        const enchargeData = {
    email: data.email,
    firstName: data.name.split(' ')[0],
    tagName: `X2-Constraint: ${data.primaryConstraint}`,
    customFields: {
       PrimaryConstraint: data.primaryConstraint
    }
};

const response = await fetch('/.netlify/functions/add-to-encharge', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(enchargeData)
});

if (!response.ok) {
    console.warn('Encharge constraint tag failed, but continuing...');
} else {
    console.log('Added to Encharge successfully');
}

// Add Diagnostic tag
const diagnosticTagData = {
    email: data.email,
    firstName: data.name.split(' ')[0],
    tagName: 'Diagnostic'
};

const diagnosticResponse = await fetch('/.netlify/functions/add-to-encharge', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(diagnosticTagData)
});

if (!diagnosticResponse.ok) {
    console.warn('Encharge diagnostic tag failed, but continuing...');
} else {
    console.log('Diagnostic tag added successfully');
}
    } catch (error) {
        console.error('Error adding to Encharge:', error);
        // Don't throw - Encharge failure shouldn't block the user
    }
}

/**
 * Send results email to user
 */
async function sendResultsEmail() {
    const sendBtn = document.getElementById('sendEmailBtn');
    const sentMsg = document.getElementById('emailSentMessage');
    
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    
    try {
        const fullReportMarkdown = ResultsRenderer.generateResultsMarkdown(
            AppState.results,
            AppState.contextAnswers
        );
        
        const data = {
            userName: AppState.contextAnswers.name,
            userEmail: AppState.userEmail,
            contextAnswers: AppState.contextAnswers,
            selectedConstraint: {
                category: AppState.results.primaryConstraint.name
            },
            scores: AppState.results.areaScores,
            fullReportMarkdown: fullReportMarkdown
        };
        
        const response = await fetch('/.netlify/functions/send-results-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        
        sendBtn.textContent = 'Email Sent!';
        sentMsg.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error sending results email:', error);
        sendBtn.textContent = 'Send Results to My Email';
        sendBtn.disabled = false;
        alert('There was an error sending the email. Please try again.');
    }
}

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================

document.addEventListener('keydown', (event) => {
    // Allow Enter to proceed on current screen
    if (event.key === 'Enter') {
        const currentScreen = AppState.currentScreen;
        
        if (currentScreen === 'context') {
            const nextBtn = document.getElementById('contextNextBtn');
            if (nextBtn && !nextBtn.disabled) {
                nextContextQuestion();
            }
        } else if (currentScreen === 'diagnostic') {
            const nextBtn = document.getElementById('diagnosticNextBtn');
            if (nextBtn && !nextBtn.disabled) {
                nextDiagnosticQuestion();
            }
        }
    }
    
    // Allow number keys 1-5 to select options on diagnostic screen
    if (AppState.currentScreen === 'diagnostic') {
        const key = parseInt(event.key, 10);
        if (key >= 1 && key <= 5) {
            const option = document.querySelector(`.scale-option[data-value="${key}"]`);
            if (option) {
                option.click();
            }
        }
    }
});

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('X2 Diagnostic App initialized');
    console.log('Version:', AppState.questionnaireVersion);
});
