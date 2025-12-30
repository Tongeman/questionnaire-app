// generate-diagram.js
// Netlify Function: Generate PNG diagram from scores
// Uses sharp library to convert SVG to PNG

const sharp = require('sharp');

// Import the diagram generator (same logic as client-side)
const DiagramGenerator = require('./diagram-generator-server');

exports.handler = async (event, context) => {
    // Allow both GET (with query params) and POST (with body)
    if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        let scores;
        
        if (event.httpMethod === 'POST') {
            const body = JSON.parse(event.body || '{}');
            scores = body.scores;
        } else {
            // GET request - parse from query string
            const params = event.queryStringParameters || {};
            if (params.scores) {
                scores = JSON.parse(params.scores);
            }
        }

        if (!scores) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing scores parameter' })
            };
        }

        console.log('Generating diagram with scores:', scores);

        // Generate SVG
        const svgString = DiagramGenerator.generate(scores);

        // Convert SVG to PNG using sharp
        const pngBuffer = await sharp(Buffer.from(svgString))
            .png()
            .toBuffer();

        // Return as base64
        const base64 = pngBuffer.toString('base64');

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                png: base64,
                dataUri: `data:image/png;base64,${base64}`
            })
        };

    } catch (error) {
        console.error('Error generating diagram:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to generate diagram',
                details: error.message
            })
        };
    }
};
