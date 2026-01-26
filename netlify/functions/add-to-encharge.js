// add-to-encharge.js
// Netlify Function: Add contact to Encharge with X2 constraint tag

const { addPersonWithTag } = require('./encharge-client');

exports.handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { email, firstName, tagName } = JSON.parse(event.body || '{}');

        if (!email || !firstName || !tagName) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required fields: email, firstName, or tagName',
                }),
            };
        }
        
........const { email, firstName, tagName, customFields } = JSON.parse(event.body || '{}');

        console.log('Adding person to Encharge:', email);
        console.log('Tag:', tagName);
        console.log('Custom Fields:', customFields);

        // Add person and tag them
        const result = await addPersonWithTag(email, firstName, tagName, customFields || {});

        console.log('Successfully added to Encharge:', email, 'with tag:', tagName);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: `Successfully added ${email} to Encharge with tag ${tagName}`,
                data: result,
            }),
        };

    } catch (error) {
        console.error('Error adding to Encharge:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: 'Server error adding to Encharge',
                details: error.message,
            }),
        };
    }
};
