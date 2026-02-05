/**
 * X2 Method - Scorecard Questions
 * 9 questions across 9 areas (1 question per area)
 * Each question is rated 1-5 where 1 = rarely/never applies, 5 = consistently applies
 */

const DIAGNOSTIC_QUESTIONS = [
    // =========================================================================
    // 1. FINANCIAL CONTROL (Flying Blind)
    // =========================================================================
    {
        id: 'fc-1',
        areaId: 'financial-control',
        text: "I can confidently state my gross profit margin and net profit for last month without checking.",
        scaleLabels: {
            1: "I have no idea what these numbers are",
            2: "I'd have to dig through records to find out",
            3: "I have a rough sense but couldn't be precise",
            4: "I know approximately but not exactly",
            5: "I know these numbers and review them regularly"
        }
    },

    // =========================================================================
    // 2. GROWTH STRATEGY (Hamster Wheel)
    // =========================================================================
    {
        id: 'gs-1',
        areaId: 'growth-strategy',
        text: "If I doubled my revenue tomorrow, my workload wouldn't need to double with it.",
        scaleLabels: {
            1: "Doubling revenue would definitely mean doubling my hours",
            2: "Revenue growth always means significantly more work for me",
            3: "Some growth is possible without more hours, but not much",
            4: "I could handle moderate growth without much more effort",
            5: "My model allows revenue to grow independently of my time"
        }
    },

    // =========================================================================
    // 3. LIFESTYLE & EXIT PLAN (Trapped)
    // =========================================================================
    {
        id: 'le-1',
        areaId: 'lifestyle-exit',
        text: "I take regular holidays where the business continues to operate without me.",
        scaleLabels: {
            1: "I can't take time off — the business stops if I do",
            2: "I can take brief breaks but the business suffers",
            3: "Short holidays are possible with some preparation",
            4: "I can take reasonable breaks with the business running",
            5: "I take regular holidays and the business runs smoothly"
        }
    },

    // =========================================================================
    // 4. MARKETING & LEADS (Mud At The Wall)
    // =========================================================================
    {
        id: 'ml-1',
        areaId: 'marketing-leads',
        text: "I have a predictable, repeatable system that generates new enquiries each month.",
        scaleLabels: {
            1: "New enquiries are completely unpredictable",
            2: "Enquiries come but I don't know why or when",
            3: "Some channels work sometimes but inconsistently",
            4: "I have systems that work reasonably well",
            5: "I have a reliable system that generates consistent leads"
        }
    },

    // =========================================================================
    // 5. SELLING & SALESPEOPLE (Tyre Kickers)
    // =========================================================================
    {
        id: 'ss-3',
        areaId: 'selling-sales',
        text: "Prospects rarely leave to 'think about it' without a clear next step agreed.",
        scaleLabels: {
            1: "Most prospects disappear to 'think about it'",
            2: "Many conversations end without clear next steps",
            3: "Sometimes I secure next steps, sometimes not",
            4: "I usually establish clear next steps",
            5: "I always secure commitment to a next step"
        }
    },

    // =========================================================================
    // 6. SERVICE & REPUTATION (Revolving Door)
    // =========================================================================
    {
        id: 'sr-1',
        areaId: 'service-reputation',
        text: "Most of my customers return for repeat purchases or ongoing work.",
        scaleLabels: {
            1: "Almost no customers return",
            2: "Few customers come back",
            3: "Some repeat business but inconsistent",
            4: "Good repeat business from many customers",
            5: "Strong customer retention and loyalty"
        }
    },

    // =========================================================================
    // 7. DRIVE CHANGE (Asleep At The Wheel)
    // =========================================================================
    {
        id: 'dc-1',
        areaId: 'drive-change',
        text: "I regularly set aside time to work ON the business, not just IN it.",
        scaleLabels: {
            1: "I'm 100% consumed by day-to-day work",
            2: "Very rarely find time for strategic work",
            3: "Occasionally work on the business",
            4: "Regular but not enough strategic time",
            5: "Dedicated, protected time for strategic work"
        }
    },

    // =========================================================================
    // 8. PEOPLE MANAGEMENT (Herding Cats)
    // =========================================================================
    {
        id: 'pm-1',
        areaId: 'people-management',
        text: "My team takes ownership of their work and solves problems without always needing me.",
        scaleLabels: {
            1: "Everything requires my input",
            2: "Team rarely acts without checking with me",
            3: "Some ownership but still too dependent on me",
            4: "Good ownership with occasional escalations",
            5: "Strong ownership — they handle issues independently"
        }
    },

    // =========================================================================
    // 9. SYSTEMS & AUTOMATION (Blu-Tac & Post-It Notes)
    // =========================================================================
    {
        id: 'sa-1',
        areaId: 'systems-automation',
        text: "Key processes in my business are documented so anyone could follow them.",
        scaleLabels: {
            1: "Nothing is documented",
            2: "Very little documentation exists",
            3: "Some processes documented but incomplete",
            4: "Most key processes are documented",
            5: "Comprehensive documentation for all processes"
        }
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DIAGNOSTIC_QUESTIONS
    };
}
