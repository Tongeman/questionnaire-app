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
        greenDescription: "You've got solid financial visibility — you understand your numbers and use them to guide decisions. This is a real strength. The opportunity now is refinement: sharper forecasting, earlier warning indicators, and using your financial clarity as a competitive advantage. When you know your numbers better than most owners in your market, you can move faster and take smarter risks.",
        amberDescription: "You're not completely in the dark, but there are gaps in your financial picture. You might know your revenue but be fuzzy on margins. You might check the bank balance more than your P&L. This partial visibility means some decisions are informed and others are guesswork — and you can't always tell which is which. Closing these gaps would mean fewer nasty surprises, better pricing decisions, and the quiet confidence that comes from genuinely understanding your business's financial engine.",
        redDescription: "If numbers make you nervous, you're not alone — but avoiding them is costing you. You're probably making decisions based on gut feel and your bank balance, rather than data. That means you could be profitable on paper but bleeding cash in reality, or busy but broke without understanding why. The stress of not really knowing where you stand financially creates a constant background hum of anxiety. Imagine instead having a clear dashboard — knowing exactly what's working, what isn't, and making decisions with confidence rather than crossed fingers."
    },
    {
        id: 'growth-strategy',
        name: 'Growth Strategy',
        chaosName: 'Hamster Wheel',
        tagline: "Your Business Is A Hamster Wheel — No Matter How Fast It Spins, It's Going Nowhere",
        shadow: "You focus on 'more sales' without checking the margins or the model. You sell time for money or low-margin products.",
        description: "The business demands maximum exertion just to stay in the same place. If you stop running for a day, the business stops. Doubling revenue requires doubling your sweat.",
        crisis: "Burnout. The engine blows up because it was running at redline with no gears.",
        greenDescription: "Your business model has real leverage — revenue can grow without your hours growing proportionally. This puts you ahead of most small business owners. The next level is optimising that leverage: finding where you can create even more value with less personal input, and building assets that compound over time rather than just generate income.",
        amberDescription: "There's some leverage in your model, but you're still too tied to delivery. Growth is possible but it feels hard — you can see the ceiling from here. You're probably working more hours than you'd like and wondering whether it has to be this way. It doesn't. With some strategic adjustments, you could create more breathing room and build a business that scales without scaling your personal workload at the same rate.",
        redDescription: "Your business model has you trapped on a hamster wheel. More revenue means more work — from you, personally. You might be selling your time directly, or your margins are so tight that volume is the only path to profit. Either way, you feel it: the exhaustion, the sense that you can't take a proper holiday, the creeping realisation that you've built a job, not a business. Imagine a model where growth didn't require you to work harder — where the engine had gears, and you could actually accelerate without redlining."
    },
    {
        id: 'lifestyle-exit',
        name: 'Lifestyle & Exit Plan',
        chaosName: 'Trapped',
        tagline: "You're Trapped — You Built a Business That Owns You",
        shadow: "You sacrifice your life for the business, believing 'it will be worth it one day,' without building actual asset value.",
        description: "The business has become your prison guard. It dictates your hours, limits your holidays, and drives increasing stress levels. It is a job you cannot quit that you really don't want.",
        crisis: "Resentment. You grow to hate the thing you built, and because it relies on you, it has no saleable value (Zero Exit).",
        greenDescription: "Your business supports your lifestyle and has genuine value beyond your personal involvement. This is rare and worth protecting. The opportunity is to strengthen this further — building more assets, deepening the independence from you, and ensuring that when you choose to exit (on your terms), the value is maximised.",
        amberDescription: "There's some flexibility, but the business still demands more than you'd like. Holidays come with guilt or a phone that never stops buzzing. You've thought about what an exit might look like, but the picture is fuzzy. With focus, you could build a business that gives you more control over your time and creates real, transferable value — not just income while you're grinding.",
        redDescription: "You built this business for freedom, but somewhere along the way, it became your cage. It dictates your hours, decides when you can take a holiday, and the thought of stepping away — even briefly — fills you with dread. Worse, if you're honest, the business probably isn't worth much without you in it. That's not a business; it's a high-stress job with no pension. Imagine a business that supported your life instead of consuming it — one that had genuine value whether you're there or not."
    },
    {
        id: 'marketing-leads',
        name: 'Marketing & Leads',
        chaosName: 'Mud At The Wall',
        tagline: "Your Marketing is Mud At The Wall — Trying Everything, Hoping Something Sticks",
        shadow: "You assume 'being good' is enough. You have tried all kinds of marketing but nothing's worked for you. You depend upon repeat purchases, referrals and luck to get new customers.",
        description: "New customers are a novelty, not the normal state of affairs. Your products and services are great, but the streets are empty. You live in anxiety about where the next client is coming from.",
        crisis: "Obscurity. You wither away and are replaced by a louder, inferior competitor.",
        greenDescription: "You've built predictable lead generation — you know what works and you can scale it. This is a significant competitive advantage. The next step is optimisation and diversification: improving conversion rates, reducing acquisition costs, and ensuring you're not over-reliant on a single channel that could change overnight.",
        amberDescription: "You've had some marketing success, but it's inconsistent. Some months are strong; others have you wondering what went wrong. You haven't yet cracked the code on a repeatable, scalable approach. The good news is you're not starting from zero — you know something works, you just need to bottle it. A systematic approach would smooth out the peaks and troughs and end the feast-or-famine cycle.",
        redDescription: "New customers feel like happy accidents rather than predictable events. You've probably tried various marketing approaches — some social media here, a bit of networking there — but nothing has really stuck. You depend on referrals, repeat business, and luck. That unpredictability creates anxiety: where's the next client coming from? Imagine having a reliable pipeline — knowing that leads will arrive this week, next week, and the week after, because you've built a system that works."
    },
    {
        id: 'selling-sales',
        name: 'Selling & Salespeople',
        chaosName: 'Tyre Kickers',
        tagline: "You're Drowning in Tyre Kickers — Plenty of Interest, Not Enough Sales",
        shadow: "You avoid 'selling.' You have no process. Customers don't buy, they go away 'to think about it' instead.",
        description: "The business wastes opportunity. Interest pours in, but it drains right out through the holes in your process. You are paying for attention that you cannot capture.",
        crisis: "Starvation. You have leads, but you starve for lack of signed contracts.",
        greenDescription: "You've got a strong sales process with healthy conversion rates. Leads turn into customers reliably, and your team (or you) can sell without it feeling like a grind. The opportunity now is refinement: improving average deal value, shortening sales cycles, and ensuring the process is documented well enough that it doesn't depend on one person's magic touch.",
        amberDescription: "You close deals, but you know you're leaving money on the table. Your process has some structure, but it's inconsistent — some conversations go brilliantly, others fizzle for reasons you can't quite identify. Tightening up your sales approach would mean better conversion rates, fewer wasted hours on tyre-kickers, and more confidence in every sales conversation.",
        redDescription: "Leads come in, but too many slip away. You hear \"I'll think about it\" more than you'd like. You might be spending hours on proposals that go nowhere, or discounting just to close deals. Perhaps you avoid the word \"selling\" altogether because it feels uncomfortable. The result is the same: opportunity leaking out of your business like water through a sieve. Imagine a sales process where the right prospects said yes with confidence — and you didn't have to feel pushy to make it happen."
    },
    {
        id: 'service-reputation',
        name: 'Service & Reputation',
        chaosName: 'Revolving Door',
        tagline: "You've Got a Revolving Door — Customers Buy Once and Disappear",
        shadow: "You focus entirely on the 'hunt' (new clients) and neglect the 'harvest' (existing clients). Customers become restless and don't feel like you care about them.",
        description: "The business can't hold onto momentum. For every new client you win and bring through the front door, an old one walks out the back door. You are exhausted by client onboarding without growth.",
        crisis: "Reputation Collapse. The market thinks you don't care, even though you do, and the number of new leads and referrals slows to a drip.",
        greenDescription: "Your customers stay, return, and refer. That's a powerful growth engine. The opportunity is to deepen this further — systematising what makes your service exceptional, capturing testimonials and case studies, and ensuring consistency even as you grow or add team members.",
        amberDescription: "You retain some customers, but there's a gap between the service you think you're delivering and how customers experience it. Referrals happen but not predictably. You're not in crisis, but you're not building the kind of loyal base that fuels sustainable growth. Strengthening retention would mean more revenue from existing clients and a growing stream of warm referrals.",
        redDescription: "You're working hard to win new customers, but they're not staying — or they're not coming back. For every client you bring in the front door, another slips out the back. You're exhausted by constant onboarding with nothing to show for it. Referrals are rare. If this continues, your reputation will suffer — not because you don't care, but because customers don't feel cared for. Imagine clients who stayed, bought again, and actively sent others your way because they couldn't stop talking about you."
    },
    {
        id: 'drive-change',
        name: 'Drive Change',
        chaosName: 'Asleep At The Wheel',
        tagline: "You're Asleep At The Wheel — The Business Needs You To Step-Up",
        shadow: "You are too busy or preoccupied with getting work done that you don't make the changes to improve and grow your business. You avoid tough decisions and tolerate too much mediocrity.",
        description: "The business is not being steered because you're in the engine room, rather than at the wheel. It floats wherever the current takes it. There is lots of movement, but no destination.",
        crisis: "Stagnation. The market evolves, and your business is left behind, obsolete.",
        greenDescription: "You're proactively steering the business. Strategic thinking happens, tough decisions get made, and you're working on the business, not just in it. This puts you in rare company. The opportunity is to build this into the rhythm of the business — ensuring it happens consistently, not just when you force it — and developing this capability in others around you.",
        amberDescription: "You know the business needs to evolve, but finding the time and headspace is a constant struggle. You've got a list of improvements that never seems to get shorter. Decisions get delayed. The business is moving, but you're not sure it's moving forward. With more focus on driving change, you could clear that backlog and start feeling like you're in control of the direction, not just reacting to whatever lands on your desk.",
        redDescription: "You're so busy working in the business that you never work on it. Important improvements keep getting pushed to \"next month\" while urgent tasks eat your days. You tolerate things that frustrate you because fixing them feels overwhelming. The business drifts wherever the current takes it — client demands, staff issues, market shifts — because no one is steering. Imagine actually having time to think strategically, making tough decisions promptly, and watching the business move in a direction you've chosen."
    },
    {
        id: 'people-management',
        name: 'People Management',
        chaosName: 'Herding Cats',
        tagline: "You're Herding Cats — Your Team Pulls In Every Direction But Yours",
        shadow: "You hoard responsibility. You don't train. You hire 'helpers' instead of 'owners.' Your team brings you problems, not solutions.",
        description: "The business expects you to behave like a school teacher while your staff spend the day putting their hands up, asking for permission. If you leave the room, things grind to a halt.",
        crisis: "The Bottleneck. The business hits a hard ceiling because you run out of time and cannot answer any more questions.",
        greenDescription: "Your team is empowered and takes genuine ownership. They solve problems, make decisions, and drive progress without needing you in the room. This is a significant asset. The opportunity is to strengthen this culture as you grow — ensuring new hires absorb it, and that you continue to develop leaders rather than just doers.",
        amberDescription: "Your team does reasonable work, but you're still too involved. Delegation happens, but it often comes back to you in some form. You suspect people could do more, but something isn't clicking. With a clearer approach to management and accountability, you could unlock more from your team and reclaim hours you're currently spending on oversight.",
        redDescription: "Your team brings you problems, not solutions. They wait for instructions, check with you on everything, and the moment you step away, progress stalls. You feel more like a babysitter or school teacher than a business owner. You've hired helpers, not owners — people who do what you ask but never take initiative. The business hits a ceiling because you run out of hours in the day to answer questions. Imagine a team that took ownership, solved problems independently, and freed you to focus on growth instead of supervision."
    },
    {
        id: 'systems-automation',
        name: 'Systems & Automation',
        chaosName: 'Blu-Tac & Post-It Notes',
        tagline: "Your Systems Are Blu-Tac & Post-It Notes — They Don't Always Stick!",
        shadow: "You rely on memory, sticky notes, and heroic efforts to keep things moving. Your motto might be 'I'll do that! I can do it faster than my team.'",
        description: "The business is fragile. It looks solid from the outside, but one gust of wind (a key staff member leaving, you getting sick) and work grinds to a halt.",
        crisis: "Implosion. You try to scale, and the weight of the growth crushes you and your team because there's insufficient structure to hold things together.",
        greenDescription: "Your business runs on robust systems. Processes are documented, things happen reliably, and you could handle increased volume without chaos. This is a strong foundation. The opportunity is continuous improvement — refining processes, adding automation where it saves time, and ensuring systems evolve as the business does rather than becoming outdated.",
        amberDescription: "You've got some systems, but they're incomplete or inconsistent. Knowledge still lives in people's heads more than in documented processes. Things work, but they depend too much on specific individuals remembering to do things right. Building out your systems would reduce errors, make training easier, and give you the confidence to grow without worrying the wheels will fall off.",
        redDescription: "The business runs on heroic effort, memory, and sticky notes. Key processes live in people's heads (probably yours). If you got sick or a key person left, things would unravel quickly. You're holding it together, but it's fragile — and you feel that fragility as a constant low-level stress. Scaling is terrifying because more volume would break what barely works now. Imagine a business with documented systems, reliable processes, and the structural strength to handle growth without buckling."
    }
];

// Opening paragraph for the report
const REPORT_OPENING = "Every business owner has areas they focus on — and areas they avoid, neglect, or simply can't see because their attention is elsewhere. We call this \"The Shadow.\" Left unaddressed, these shadows create daily friction, stress, and resistance — what we call \"Chaos.\" This report shows you where your shadows are hiding and what kind of chaos they're creating. It's not about judgement. It's about visibility. Because once you can see what's really going on, you can start making changes that actually move the needle — instead of running faster on a wheel that's going nowhere.";

// Closing paragraph for the report
const REPORT_CLOSING = "Here's the truth: none of these areas are broken beyond repair. Every shadow in this report can be addressed — not with more hours, more stress, or more heroic effort, but with focus, clarity, and the right approach. Business owners who systematically work through each area typically find that the chaos quietens, the business becomes easier to run, and growth stops feeling like a grind. The patterns you're seeing aren't permanent. They're just unfinished business — and unfinished business can be completed.";

// Scoring thresholds
const SCORE_THRESHOLDS = {
    red: { min: 0, max: 5 },
    amber: { min: 6, max: 11 },
    green: { min: 12, max: 15 }
};

// Status labels
const STATUS_LABELS = {
    red: 'Needs Urgent Attention',
    amber: 'Room for Improvement',
    green: 'Functioning Well'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AREA_DEFINITIONS, REPORT_OPENING, REPORT_CLOSING, SCORE_THRESHOLDS, STATUS_LABELS };
}
