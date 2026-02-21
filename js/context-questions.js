/**
 * X2 Method - Context Questions
 * Business profile questions asked before the diagnostic
 */

const CONTEXT_QUESTIONS = [
    {
        id: 'name',
        text: "What's your name?",
        type: 'text',
        placeholder: 'Your full name',
        required: true
    },
    {
        id: 'business_description',
        text: "In a sentence or two, what does your business do?",
        type: 'textarea',
        placeholder: 'e.g., We provide accounting services to small businesses in Yorkshire',
        required: true
    },
    {
        id: 'annual_revenue',
        text: "What's your approximate annual revenue?",
        type: 'select',
        options: [
            { value: '', label: 'Select a range...' },
            { value: 'under-100k', label: 'Under £100,000' },
            { value: '100k-250k', label: '£100,000 - £250,000' },
            { value: '250k-500k', label: '£250,000 - £500,000' },
            { value: '500k-1m', label: '£500,000 - £1,000,000' },
            { value: 'over-1m', label: 'Over £1,000,000' }
        ],
        required: true
    }

];

// Labels for displaying revenue and hours in results
const REVENUE_LABELS = {
    'under-100k': 'Under £100,000',
    '100k-250k': '£100,000 - £250,000',
    '250k-500k': '£250,000 - £500,000',
    '500k-1m': '£500,000 - £1,000,000',
    'over-1m': 'Over £1,000,000'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTEXT_QUESTIONS, REVENUE_LABELS };
}
