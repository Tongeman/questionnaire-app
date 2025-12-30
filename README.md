# X2 Business Growth Diagnostic

A web-based diagnostic tool for the X2 Method, helping business owners identify which of 9 key areas is their primary growth constraint.

## Features

- **45-question diagnostic** covering 9 business areas
- **Red/Amber/Green scoring** for each area
- **Primary constraint identification** (lowest scoring area)
- **Personalised results** with descriptions for each status
- **Email results** to users via Resend
- **Data storage** in Supabase
- **CRM integration** with Encharge (tagging by constraint)

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework)
- **Backend**: Netlify Functions (serverless)
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **CRM**: Encharge

## Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd x2-diagnostic
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the contents of `supabase-schema.sql` to create the required tables
4. Copy your project URL and anon key from Settings > API

### 3. Encharge Setup

1. Log in to your Encharge account
2. Go to Settings > API Keys
3. Create a new API key
4. Copy the key

### 4. Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Verify your domain (e.g., `reports.x2method.com`)
3. Create an API key
4. Copy the key

### 5. Environment Variables

#### Local Development

Create a `.env` file in the root directory:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
ENCHARGE_API_KEY=your-encharge-key
RESEND_API_KEY=re_your-resend-key
```

#### Netlify Deployment

1. Go to Site Settings > Environment Variables
2. Add each variable:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `ENCHARGE_API_KEY`
   - `RESEND_API_KEY`

### 6. Local Development

```bash
npm run dev
# or
netlify dev
```

This starts the Netlify dev server with functions support.

### 7. Deploy to Netlify

#### Option A: Via Netlify CLI

```bash
netlify deploy --prod
```

#### Option B: Via GitHub

1. Push to GitHub
2. Connect the repo to Netlify
3. Set build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
   - Functions directory: `netlify/functions`

## File Structure

```
x2-diagnostic/
├── index.html              # Main HTML file
├── styles.css              # All styling
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── supabase-schema.sql     # Database schema
│
├── js/
│   ├── area-definitions.js # 9 areas with descriptions
│   ├── diagnostic-data.js  # 45 questions
│   ├── context-questions.js# Business profile questions
│   ├── app-state.js        # State management
│   ├── scoring-engine.js   # Score calculation
│   ├── ui-renderer.js      # DOM manipulation
│   ├── results-renderer.js # Results display
│   └── main.js             # Flow control
│
└── netlify/
    └── functions/
        ├── encharge-client.js      # Shared Encharge helper
        ├── submit-diagnostic.js    # Save to Supabase
        ├── add-to-encharge.js      # Add contact + tag
        └── send-results-email.js   # Send results via Resend
```

## Customisation

### Modifying Questions

Edit `js/diagnostic-data.js` to change questions. Each question has:
- `id`: Unique identifier (e.g., `fc-1`)
- `areaId`: Links to area definition
- `text`: The question text
- `scaleLabels`: Labels for each 1-5 option

### Modifying Areas

Edit `js/area-definitions.js` to change:
- Area names and descriptions
- Shadow/Chaos/Crisis text
- Red/Amber/Green descriptions

### Modifying Scoring Thresholds

In `js/area-definitions.js`, adjust `SCORE_THRESHOLDS`:
```javascript
const SCORE_THRESHOLDS = {
    red: { min: 5, max: 11 },    // Scores 5-11 = Red
    amber: { min: 12, max: 18 }, // Scores 12-18 = Amber
    green: { min: 19, max: 25 }  // Scores 19-25 = Green
};
```

### Styling

Edit `styles.css`. Key CSS variables are at the top for easy theming:
- `--color-primary`: Main brand colour
- `--color-accent`: Accent colour
- `--color-red/amber/green`: RAG status colours

## Encharge Tags

When a user completes the diagnostic, they're tagged in Encharge with:
```
X2-Constraint: [Area Name]
```

For example: `X2-Constraint: Financial Control`

This allows you to:
- Segment users by their primary constraint
- Send targeted follow-up emails
- Track which constraints are most common

## Version

Current version: **X2-Diagnostic-v2.0**

This is stored with each submission for tracking purposes.

## Support

For issues or questions, contact the X2 Method team.
