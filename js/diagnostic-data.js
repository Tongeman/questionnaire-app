/**
 * X2 Method - Diagnostic Questions
 * 27 questions across 9 areas (3 questions per area)
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
    }, {
        id: 'fc-2',
        areaId: 'financial-control',
        text: "I have a clear picture of my cash flow forecast for the next 3 months.",
        scaleLabels: {
            1: "I don't forecast cash flow at all",
            2: "I have a vague sense of upcoming expenses",
            3: "I track some things but not systematically",
            4: "I have reasonable visibility but gaps exist",
            5: "I have a detailed, accurate forecast I update regularly"
        }
    }, {
        id: 'fc-3',
        areaId: 'financial-control',
        text: "I know exactly which products, services, or clients are most profitable for my business.",
        scaleLabels: {
            1: "I've never analysed profitability by product/client",
            2: "I assume some are more profitable but haven't checked",
            3: "I have a general sense but no concrete data",
            4: "I've analysed this but not recently",
            5: "I know precisely and use this to guide focus"
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
    {
        id: 'gs-2',
        areaId: 'growth-strategy',
        text: "I've consciously designed my pricing and offerings around margin, not just volume.",
        scaleLabels: {
            1: "I've never really thought about margins",
            2: "I price based on competitors or gut feel",
            3: "I consider margins but don't optimise for them",
            4: "I've designed some offerings with margin in mind",
            5: "Margin is central to how I design and price everything"
        }
    }, {
        id: 'gs-3',
        areaId: 'growth-strategy',
        text: "The business can grow without me personally delivering more work.",
        scaleLabels: {
            1: "I personally deliver almost all the work",
            2: "Growth means I must deliver significantly more",
            3: "Others deliver some work but I'm still heavily involved",
            4: "I could step back from most delivery if needed",
            5: "The business grows through others' delivery, not mine"
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
    {
        id: 'le-2',
        areaId: 'lifestyle-exit',
        text: "My business would have value to a buyer, even if I weren't part of the deal.",
        scaleLabels: {
            1: "Without me, there's nothing to sell",
            2: "The business has minimal value without me",
            3: "Some value exists but I'm still central to it",
            4: "Reasonable value exists independently of me",
            5: "The business has strong standalone value"
        }
    }, {
        id: 'le-3',
        areaId: 'lifestyle-exit',
        text: "I have a clear vision of what I want my exit from this business to look like.",
        scaleLabels: {
            1: "I've never thought about exit",
            2: "Exit seems impossibly far away or irrelevant",
            3: "I've thought about it vaguely but no clear plan",
            4: "I have a general idea but haven't planned it",
            5: "I have a clear exit vision and I'm building towards it"
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
    }, {
        id: 'ml-2',
        areaId: 'marketing-leads',
        text: "I know exactly where my best clients come from and focus my marketing efforts there.",
        scaleLabels: {
            1: "I have no idea where my best clients come from",
            2: "I could guess but haven't really tracked it",
            3: "I know broadly but not specifically",
            4: "I track sources and have reasonable insight",
            5: "I know precisely and concentrate efforts accordingly"
        }
    }, {
        id: 'ml-3',
        areaId: 'marketing-leads',
        text: "I can clearly articulate what makes my business different from competitors.",
        scaleLabels: {
            1: "I struggle to explain why clients should choose me",
            2: "My differentiation is vague or generic",
            3: "I have some differentiators but they're not compelling",
            4: "I have a clear message but could sharpen it",
            5: "My positioning is clear, compelling, and well-communicated"
        }
    },

    // =========================================================================
    // 5. SELLING & SALESPEOPLE (Tyre Kickers)
    // =========================================================================
    {
        id: 'ss-1',
        areaId: 'selling-sales',
        text: "I have a defined sales process that I (or my team) follow consistently.",
        scaleLabels: {
            1: "No process — every sale is completely ad hoc",
            2: "A loose approach but nothing structured",
            3: "Some steps exist but aren't followed consistently",
            4: "A reasonable process that we mostly follow",
            5: "A clear, documented process followed every time"
        }
    }, {
        id: 'ss-2',
        areaId: 'selling-sales',
        text: "I convert a healthy proportion of enquiries into paying customers.",
        scaleLabels: {
            1: "Very few enquiries become customers",
            2: "Conversion is poor and frustrating",
            3: "Conversion is okay but could be much better",
            4: "Conversion is reasonable for my industry",
            5: "I have strong conversion rates I'm proud of"
        }
    },
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
    {
        id: 'sr-2',
        areaId: 'service-reputation',
        text: "Customers regularly refer others to my business without being asked.",
        scaleLabels: {
            1: "Referrals are extremely rare",
            2: "Occasional referrals but nothing reliable",
            3: "Some referrals come in organically",
            4: "Regular referrals from satisfied customers",
            5: "Referrals are a significant source of business"
        }
    }, {
        id: 'sr-3',
        areaId: 'service-reputation',
        text: "I actively gather testimonials and reviews, and my online reputation is strong.",
        scaleLabels: {
            1: "No testimonials or reviews",
            2: "A few dated testimonials, no active collection",
            3: "Some reviews but not systematically gathered",
            4: "Regular collection with a decent online presence",
            5: "Strong, recent reviews and testimonials everywhere"
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
    }, {
        id: 'dc-2',
        areaId: 'drive-change',
        text: "I make difficult decisions promptly rather than letting issues fester.",
        scaleLabels: {
            1: "I avoid difficult decisions at all costs",
            2: "Difficult decisions get delayed for months",
            3: "I eventually make them but slowly",
            4: "I address most issues reasonably promptly",
            5: "I tackle difficult decisions head-on quickly"
        }
    },
    {
        id: 'dc-3',
        areaId: 'drive-change',
        text: "I have clear goals for the business this year and a plan to achieve them.",
        scaleLabels: {
            1: "No goals or plan",
            2: "Vague aspirations but nothing concrete",
            3: "Some goals but no real plan",
            4: "Clear goals with a reasonable plan",
            5: "Crystal clear goals with detailed action plan"
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
    }, {
        id: 'pm-2',
        areaId: 'people-management',
        text: "Everyone in my team knows exactly what's expected of them and how success is measured.",
        scaleLabels: {
            1: "Unclear expectations and no measures",
            2: "Vague expectations, no real metrics",
            3: "Some clarity but inconsistent",
            4: "Clear expectations for most roles",
            5: "Crystal clear expectations and metrics for all"
        }
    },
    {
        id: 'pm-3',
        areaId: 'people-management',
        text: "I can step away from day-to-day operations without things grinding to a halt.",
        scaleLabels: {
            1: "Everything stops if I'm not there",
            2: "Significant problems if I'm away briefly",
            3: "Can manage short absences with preparation",
            4: "Team handles most things without me",
            5: "Operations run smoothly without my involvement"
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
    }, {
        id: 'sa-2',
        areaId: 'systems-automation',
        text: "If a key team member left tomorrow, their knowledge wouldn't leave with them.",
        scaleLabels: {
            1: "Critical knowledge lives only in people's heads",
            2: "Most knowledge would walk out the door",
            3: "Some knowledge captured but big gaps",
            4: "Reasonable knowledge transfer processes",
            5: "All critical knowledge is documented and shared"
        }
    },
    {
        id: 'sa-3',
        areaId: 'systems-automation',
        text: "The business could handle a significant increase in volume without chaos.",
        scaleLabels: {
            1: "Any increase would cause chaos",
            2: "Even small increases create problems",
            3: "Moderate increases manageable with stress",
            4: "Could handle reasonable growth smoothly",
            5: "Built to scale — growth wouldn't cause chaos"
        }
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DIAGNOSTIC_QUESTIONS
    };
}
