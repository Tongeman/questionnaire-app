// encharge-client.js
// Shared Encharge client for Netlify functions

const ENCHARGE_API_KEY = process.env.ENCHARGE_API_KEY;

if (!ENCHARGE_API_KEY) {
    console.warn(
        'ENCHARGE_API_KEY is not set. Encharge-related calls will fail until this is configured.'
    );
}

/**
 * Create or update a person in Encharge.
 * @param {string} email
 * @param {string} firstName
 * @param {Object} customFields - Optional custom fields to set
 * @returns {Promise<any>} Response payload from Encharge
 */
async function ensurePerson(email, firstName, customFields = {}) {
    if (!ENCHARGE_API_KEY) {
        throw new Error('ENCHARGE_API_KEY is not configured');
    }

    const personData = {
        email,
        firstName,
        ...customFields
    };

    const response = await fetch('https://api.encharge.io/v1/people', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Encharge-Token': ENCHARGE_API_KEY,
        },
        body: JSON.stringify([personData]),
    });

    let data;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        console.error('Encharge person error:', data);
        throw new Error('Failed to add person to Encharge');
    }

    console.log('Successfully added/updated person in Encharge:', email);
    return data;
}

/**
 * Add a tag to a person in Encharge.
 * @param {string} email
 * @param {string} tagName
 * @returns {Promise<any>} Response payload from Encharge
 */
async function addTag(email, tagName) {
    if (!ENCHARGE_API_KEY) {
        throw new Error('ENCHARGE_API_KEY is not configured');
    }

    const response = await fetch('https://api.encharge.io/v1/tags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Encharge-Token': ENCHARGE_API_KEY,
        },
        body: JSON.stringify({
            email,
            tag: tagName,
        }),
    });

    let data;
    try {
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch {
            data = { message: text };
        }
    } catch (err) {
        console.error('Error reading Encharge tag response:', err);
        data = {};
    }

    if (!response.ok) {
        console.error('Encharge tagging error:', data);
        throw new Error('Failed to tag person in Encharge');
    }

    console.log('Successfully tagged person in Encharge:', email, 'with tag:', tagName);
    return data;
}

/**
 * Convenience helper:
 * 1. Ensure the person exists.
 * 2. Add a tag to them.
 */
async function addPersonWithTag(email, firstName, tagName, customFields = {}) {
    await ensurePerson(email, firstName, customFields);
    const tagData = await addTag(email, tagName);
    return { success: true, tagData };
}

module.exports = {
    ensurePerson,
    addTag,
    addPersonWithTag,
};
