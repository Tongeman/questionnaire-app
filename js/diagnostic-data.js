/**
 * X2 Method - Diagnostic Questions
 * 45 questions across 9 areas (5 questions per area)
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
    {
        id: 'fc-2',
        areaId: 'financial-control',
        text: "I use financial data (not just my bank balance) to make decisions about pricing, hiring, and investment.",
        scaleLabels: {
            1: "I rely entirely on my bank balance",
            2: "I occasionally look at other numbers",
            3: "I use some financial data but not consistently",
            4: "I usually consult financial data for big decisions",
            5: "Financial data drives all my major decisions"
        }
    },
    {
        id: 'fc-3',
        areaId: 'financial-control',
        text: "I have a clear picture of my cash flow forecast for the next 3 months.",
        scaleLabels: {
            1: "I don't forecast cash flow at all",
            2: "I have a vague sense of upcoming expenses",
            3: "I track some things but not systematically",
            4: "I have reasonable visibility but gaps exist",
            5: "I have a detailed, accurate forecast I update regularly"
        }
    },
    {
        id: 'fc-4',
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
    {
        id: 'fc-5',
        areaId: 'financial-control',
        text: "I regularly review financial reports and understand what the numbers are telling me.",
        scaleLabels: {
            1: "I avoid looking at financial reports",
            2: "I glance at them but don't really understand them",
            3: "I review occasionally with some understanding",
            4: "I review regularly but sometimes miss insights",
            5: "I review frequently and use insights to take action"
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
        text: "My business model allows me to increase income without proportionally increasing my time.",
        scaleLabels: {
            1: "My income is directly tied to hours worked",
            2: "There's very little leverage in my model",
            3: "Some leverage exists but it's limited",
            4: "I have reasonable leverage built into the model",
            5: "My model has strong leverage — income can scale without my time"
        }
    },
    {
        id: 'gs-3',
        areaId: 'growth-strategy',
        text: "I've consciously designed my pricing and offerings around margin, not just volume.",
        scaleLabels: {
            1: "I've never really thought about margins",
            2: "I price based on competitors or gut feel",
            3: "I consider margins but don't optimise for them",
            4: "I've designed some offerings with margin in mind",
            5: "Margin is central to how I design and price everything"
        }
    },
    {
        id: 'gs-4',
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
    {
        id: 'gs-5',
        areaId: 'growth-strategy',
        text: "I spend time working on strategic growth, not just fulfilling orders and serving clients.",
        scaleLabels: {
            1: "I'm entirely consumed by day-to-day delivery",
            2: "Strategic thinking happens rarely, if ever",
            3: "I occasionally think strategically but not consistently",
            4: "I allocate some time to strategy but could do more",
            5: "Strategic growth work is a regular part of my schedule"
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
        text: "I have consciously designed my business to support the lifestyle I want.",
        scaleLabels: {
            1: "The business completely dictates my lifestyle",
            2: "I've made small accommodations but the business rules",
            3: "There's some balance but not by design",
            4: "I've made intentional choices to support my lifestyle",
            5: "My business is deliberately structured around my ideal life"
        }
    },
    {
        id: 'le-3',
        areaId: 'lifestyle-exit',
        text: "My business would have value to a buyer, even if I weren't part of the deal.",
        scaleLabels: {
            1: "Without me, there's nothing to sell",
            2: "The business has minimal value without me",
            3: "Some value exists but I'm still central to it",
            4: "Reasonable value exists independently of me",
            5: "The business has strong standalone value"
        }
    },
    {
        id: 'le-4',
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
    {
        id: 'le-5',
        areaId: 'lifestyle-exit',
        text: "The business serves my life goals rather than the other way around.",
        scaleLabels: {
            1: "I serve the business completely",
            2: "The business demands come first, my life second",
            3: "It's a constant struggle to balance the two",
            4: "I've achieved reasonable balance most of the time",
            5: "The business is a vehicle for my life goals"
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
    {
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
    },
    {
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
    {
        id: 'ml-4',
        areaId: 'marketing-leads',
        text: "I proactively generate leads rather than relying mainly on referrals and repeat business.",
        scaleLabels: {
            1: "I depend entirely on referrals and luck",
            2: "Occasional marketing but mostly reactive",
            3: "Mix of proactive and referral-based",
            4: "Proactive lead gen is a regular activity",
            5: "I have systematic proactive lead generation"
        }
    },
    {
        id: 'ml-5',
        areaId: 'marketing-leads',
        text: "I know my cost per lead and customer acquisition cost.",
        scaleLabels: {
            1: "I've never calculated these",
            2: "I have no idea what acquiring a customer costs",
            3: "I have rough estimates but no real tracking",
            4: "I track these metrics with reasonable accuracy",
            5: "I know these precisely and use them to optimise spend"
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
    },
    {
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
        text: "I feel confident in sales conversations and can handle objections comfortably.",
        scaleLabels: {
            1: "I dread sales conversations and avoid them",
            2: "Sales makes me uncomfortable",
            3: "I can manage but don't enjoy it",
            4: "I'm reasonably confident in sales situations",
            5: "I'm confident and skilled at selling"
        }
    },
    {
        id: 'ss-4',
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
    {
        id: 'ss-5',
        areaId: 'selling-sales',
        text: "I know my conversion rates at each stage of the sales process.",
        scaleLabels: {
            1: "I don't track any conversion metrics",
            2: "I have a vague sense but no real data",
            3: "I track overall conversion but not by stage",
            4: "I track key stages with reasonable accuracy",
            5: "I track every stage and use data to improve"
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
        text: "I have a structured process for staying in touch with past customers.",
        scaleLabels: {
            1: "No follow-up — customers disappear after purchase",
            2: "Occasional contact but nothing systematic",
            3: "Some follow-up but could be more consistent",
            4: "Regular contact with most past customers",
            5: "Systematic nurturing of all customer relationships"
        }
    },
    {
        id: 'sr-3',
        areaId: 'service-reputation',
        text: "Customers regularly refer others to my business without being asked.",
        scaleLabels: {
            1: "Referrals are extremely rare",
            2: "Occasional referrals but nothing reliable",
            3: "Some referrals come in organically",
            4: "Regular referrals from satisfied customers",
            5: "Referrals are a significant source of business"
        }
    },
    {
        id: 'sr-4',
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
    {
        id: 'sr-5',
        areaId: 'service-reputation',
        text: "I invest as much energy in delighting existing customers as I do in winning new ones.",
        scaleLabels: {
            1: "All focus is on new customers",
            2: "Existing customers get minimal attention",
            3: "Some attention to existing customers",
            4: "Good balance between new and existing",
            5: "Existing customers are actively nurtured and delighted"
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
    {
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
        text: "I'm proactively evolving the business rather than just reacting to circumstances.",
        scaleLabels: {
            1: "Entirely reactive — putting out fires",
            2: "Mostly reactive with rare proactive moments",
            3: "Mix of reactive and proactive",
            4: "Generally proactive with some reactive",
            5: "Consistently ahead of the curve, shaping events"
        }
    },
    {
        id: 'dc-4',
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
    {
        id: 'dc-5',
        areaId: 'drive-change',
        text: "I address underperformance and problems quickly rather than hoping they'll resolve themselves.",
        scaleLabels: {
            1: "I ignore problems and hope they go away",
            2: "Problems linger far too long",
            3: "I address some problems but not all",
            4: "Most issues get dealt with reasonably quickly",
            5: "I address all issues promptly and directly"
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
    {
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
        text: "I have invested in training my team so they can handle more responsibility.",
        scaleLabels: {
            1: "No training investment at all",
            2: "Minimal training — learn on the job",
            3: "Some training but not systematic",
            4: "Regular training and development",
            5: "Strong investment in growing capabilities"
        }
    },
    {
        id: 'pm-4',
        areaId: 'people-management',
        text: "My team feels genuinely engaged in the business, not just showing up for a wage.",
        scaleLabels: {
            1: "They do minimum required for pay",
            2: "Low engagement and motivation",
            3: "Average engagement",
            4: "Good engagement from most team members",
            5: "Highly engaged team who care about success"
        }
    },
    {
        id: 'pm-5',
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
    },
    {
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
        text: "We use technology and automation to reduce repetitive manual work.",
        scaleLabels: {
            1: "Everything is manual",
            2: "Very limited use of technology",
            3: "Some automation but lots still manual",
            4: "Good use of technology for key tasks",
            5: "Strong automation reducing manual effort"
        }
    },
    {
        id: 'sa-4',
        areaId: 'systems-automation',
        text: "Our systems are robust enough that mistakes and dropped balls are rare.",
        scaleLabels: {
            1: "Mistakes and dropped balls are common",
            2: "Frequent issues due to poor systems",
            3: "Occasional issues slip through",
            4: "Systems catch most potential issues",
            5: "Robust systems mean errors are very rare"
        }
    },
    {
        id: 'sa-5',
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
    module.exports = { DIAGNOSTIC_QUESTIONS };
}
