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
        id: 'business_name',
        text: "What's your business called?",
        type: 'text',
        placeholder: 'Your business name',
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
    },
    {
        id: 'hours_per_week',
        text: "On average, how many hours per week do you spend working in your business?",
        type: 'select',
        options: [
            { value: '', label: 'Select a range...' },
            { value: 'under-20', label: 'Under 20 hours' },
            { value: '20-40', label: '20 - 40 hours' },
            { value: '40-50', label: '40 - 50 hours' },
            { value: '50-60', label: '50 - 60 hours' },
            { value: 'over-60', label: 'Over 60 hours' }
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

const HOURS_LABELS = {
    'under-20': 'Under 20 hours',
    '20-40': '20 - 40 hours',
    '40-50': '40 - 50 hours',
    '50-60': '50 - 60 hours',
    'over-60': 'Over 60 hours'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTEXT_QUESTIONS, REVENUE_LABELS, HOURS_LABELS };
}
