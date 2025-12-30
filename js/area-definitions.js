/**
 * X2 Method - Area Definitions
 * Contains the 9 business areas with their descriptions, shadows, chaos, and crisis
 */

const AREA_DEFINITIONS = [
    {
        id: 'financial-control',
        name: 'Financial Control',
        chaosName: 'Flying Blind',
        tagline: "You're Flying Blind — Making Decisions Without Knowing Your Numbers",
        shadow: "You ignore the numbers because you fear them, or find them too confusing. You run the business from the bank balance.",
        description: "Your business is opaque. Money goes in, money goes out, but you have no idea how the machine works inside. You make decisions based on 'bank balance vibes,' not data.",
        crisis: "Insolvency. You run out of cash while thinking you were profitable.",
        greenDescription: "You have strong financial visibility. You understand your numbers and use them to make informed decisions.",
        amberDescription: "You have some financial awareness but there are gaps. You may be making decisions without full clarity on margins and cash flow.",
        redDescription: "Financial visibility is a blind spot. You're likely running the business from your bank balance without understanding the underlying economics."
    },
    {
        id: 'growth-strategy',
        name: 'Growth Strategy',
        chaosName: 'Hamster Wheel',
        tagline: "Your Business Is A Hamster Wheel — No Matter How Fast It Spins, It's Going Nowhere",
        shadow: "You focus on 'more sales' without checking the margins or the model. You sell time for money or low-margin products.",
        description: "The business demands maximum exertion just to stay in the same place. If you stop running for a day, the business stops. Doubling revenue requires doubling your sweat.",
        crisis: "Burnout. The engine blows up because it was running at redline with no gears.",
        greenDescription: "Your business model supports scalable growth. Revenue can increase without proportionally increasing your personal workload.",
        amberDescription: "Your growth model has some leverage but you're still too tied to delivery. Scaling will be challenging without changes.",
        redDescription: "Your business model is fundamentally tied to your personal effort. Growth means working harder, not smarter."
    },
    {
        id: 'lifestyle-exit',
        name: 'Lifestyle & Exit Plan',
        chaosName: 'Trapped',
        tagline: "You're Trapped — You Built a Business That Owns You",
        shadow: "You sacrifice your life for the business, believing 'it will be worth it one day,' without building actual asset value.",
        description: "The business has become your prison guard. It dictates your hours, limits your holidays, and drives increasing stress levels. It is a job you cannot quit that you really don't want.",
        crisis: "Resentment. You grow to hate the thing you built, and because it relies on you, it has no saleable value (Zero Exit).",
        greenDescription: "Your business supports your desired lifestyle and has genuine asset value independent of you.",
        amberDescription: "There's some flexibility but the business still demands more than you'd like. Exit value is uncertain.",
        redDescription: "The business controls your life rather than enhancing it. Without you, it has little or no saleable value."
    },
    {
        id: 'marketing-leads',
        name: 'Marketing & Leads',
        chaosName: 'Mud At The Wall',
        tagline: "Your Marketing is Mud At The Wall — Trying Everything, Hoping Something Sticks",
        shadow: "You assume 'being good' is enough. You have tried all kinds of marketing but nothing's worked for you. You depend upon repeat purchases, referrals and luck to get new customers.",
        description: "New customers are a novelty, not the normal state of affairs. Your products and services are great, but the streets are empty. You live in anxiety about where the next client is coming from.",
        crisis: "Obscurity. You wither away and are replaced by a louder, inferior competitor.",
        greenDescription: "You have predictable, systematic lead generation. You know what works and can scale it reliably.",
        amberDescription: "Lead generation is inconsistent. You've had some success but lack a repeatable, predictable system.",
        redDescription: "Lead generation is essentially luck-based. You depend heavily on referrals and repeat business with no systematic approach."
    },
    {
        id: 'selling-sales',
        name: 'Selling & Salespeople',
        chaosName: 'Tyre Kickers',
        tagline: "You're Drowning in Tyre Kickers — Plenty of Interest, Not Enough Sales",
        shadow: "You avoid 'selling.' You have no process. Customers don't buy, they go away 'to think about it' instead.",
        description: "The business wastes opportunity. Interest pours in, but it drains right out through the holes in your process. You are paying for attention that you cannot capture.",
        crisis: "Starvation. You have leads, but you starve for lack of signed contracts.",
        greenDescription: "You have a strong sales process with healthy conversion rates. Leads reliably turn into paying customers.",
        amberDescription: "Your sales process has some structure but conversion could be better. Opportunities are being lost.",
        redDescription: "Sales is a weakness. You lack a defined process and many promising leads slip away unconverted."
    },
    {
        id: 'service-reputation',
        name: 'Service & Reputation',
        chaosName: 'Revolving Door',
        tagline: "You've Got a Revolving Door — Customers Buy Once and Disappear",
        shadow: "You focus entirely on the 'hunt' (new clients) and neglect the 'harvest' (existing clients). Customers become restless and don't feel like you care about them.",
        description: "The business can't hold onto momentum. For every new client you win and bring through the front door, an old one walks out the back door. You are exhausted by client onboarding without growth.",
        crisis: "Reputation Collapse. The market thinks you don't care, even though you do, and the number of new leads and referrals slows to a drip.",
        greenDescription: "Customer retention is strong. Clients return, refer others, and your reputation drives organic growth.",
        amberDescription: "You retain some customers but there's room for improvement. Referrals are inconsistent.",
        redDescription: "Customer retention is poor. You're constantly replacing lost clients rather than building on a loyal base."
    },
    {
        id: 'drive-change',
        name: 'Drive Change',
        chaosName: 'Asleep At The Wheel',
        tagline: "You're Asleep At The Wheel — The Business Needs You To Step-Up",
        shadow: "You are too busy or preoccupied with getting work done that you don't make the changes to improve and grow your business. You avoid tough decisions and tolerate too much mediocrity.",
        description: "The business is not being steered because you're in the engine room, rather than at the wheel. It floats wherever the current takes it. There is lots of movement, but no destination.",
        crisis: "Stagnation. The market evolves, and your business is left behind, obsolete.",
        greenDescription: "You're proactively leading change. You work on the business strategically and make tough decisions when needed.",
        amberDescription: "You're aware of the need for change but struggle to find time or make difficult decisions promptly.",
        redDescription: "The business is drifting. Urgent work constantly displaces important strategic improvements."
    },
    {
        id: 'people-management',
        name: 'People Management',
        chaosName: 'Herding Cats',
        tagline: "You're Herding Cats — Your Team Pulls In Every Direction But Yours",
        shadow: "You hoard responsibility. You don't train. You hire 'helpers' instead of 'owners.' Your team brings you problems, not solutions.",
        description: "The business expects you to behave like a school teacher while your staff spend the day putting their hands up, asking for permission. If you leave the room, things grind to a halt.",
        crisis: "The Bottleneck. The business hits a hard ceiling because you run out of time and cannot answer any more questions.",
        greenDescription: "Your team is empowered and takes ownership. They solve problems and drive progress without constant oversight.",
        amberDescription: "Your team does reasonable work but you're still too involved. Delegation could be stronger.",
        redDescription: "You are the bottleneck. The team depends on you for most decisions and lacks autonomy."
    },
    {
        id: 'systems-automation',
        name: 'Systems & Automation',
        chaosName: 'Blu-Tac & Post-It Notes',
        tagline: "Your Systems Are Blu-Tac & Post-It Notes — They Don't Always Stick!",
        shadow: "You rely on memory, sticky notes, and heroic efforts to keep things moving. Your motto might be 'I'll do that! I can do it faster than my team.'",
        description: "The business is fragile. It looks solid from the outside, but one gust of wind (a key staff member leaving, you getting sick) and work grinds to a halt.",
        crisis: "Implosion. You try to scale, and the weight of the growth crushes you and your team because there's insufficient structure to hold things together.",
        greenDescription: "Your business runs on robust systems. Processes are documented and the business can handle volume without chaos.",
        amberDescription: "You have some systems but they're incomplete. Key knowledge lives in people's heads rather than in processes.",
        redDescription: "The business runs on heroic effort and memory. It's fragile and would struggle to handle growth or key personnel changes."
    }
];

// Scoring thresholds
const SCORE_THRESHOLDS = {
    red: { min: 5, max: 11 },
    amber: { min: 12, max: 18 },
    green: { min: 19, max: 25 }
};

// Status labels
const STATUS_LABELS = {
    red: 'Needs Urgent Attention',
    amber: 'Room for Improvement',
    green: 'Functioning Well'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AREA_DEFINITIONS, SCORE_THRESHOLDS, STATUS_LABELS };
}
