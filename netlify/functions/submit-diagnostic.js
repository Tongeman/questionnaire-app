// submit-diagnostic.js
// Netlify Function: Submit diagnostic results to Supabase

const { createClient } = require('@supabase/supabase-js');

// Debug logging - remove after testing ******
console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
console.log('SUPABASE_KEY exists:', !!process.env.SUPABASE_KEY);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.error('Missing Supabase environment variables!');
}
//*****************************************

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Processing diagnostic submission...');
        
        const data = JSON.parse(event.body);
        const {
            name,
            email,
            emailConsent,
            contextAnswers,
            answers,
            scores,
            primaryConstraint,
            questionnaireVersion
        } = data;

        // Validate required fields
        if (!name || !email || !answers || !questionnaireVersion) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        console.log('Submitting for:', email);

        // Insert user record
        const { data: userData, error: userError } = await supabase
            .from('diagnostic_users')
            .insert([{
                name,
                email,
                email_consent: emailConsent || false
            }])
            .select()
            .single();

        if (userError) {
            console.error('User insert error:', userError);
            throw userError;
        }

        console.log('User created with ID:', userData.id);

        // Insert submission record
        const { data: submissionData, error: submissionError } = await supabase
            .from('diagnostic_submissions')
            .insert([{
                user_id: userData.id,
                questionnaire_version: questionnaireVersion,
                business_description: contextAnswers?.business_description || null,
                annual_revenue: contextAnswers?.annual_revenue || null,
                area_scores: scores,
                primary_constraint: primaryConstraint,
                raw_answers: answers
            }])
            .select()
            .single();

        if (submissionError) {
            console.error('Submission insert error:', submissionError);
            throw submissionError;
        }

        console.log('Submission created with ID:', submissionData.id);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Diagnostic submitted successfully',
                userId: userData.id,
                submissionId: submissionData.id,
                userEmail: email,
                userName: name,
                primaryConstraint: primaryConstraint
            })
        };

    } catch (error) {
        console.error('Error processing submission:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to save diagnostic results',
                details: error.message
            })
        };
    }
};
