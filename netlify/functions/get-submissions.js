// get-submissions.js
// Netlify Function: Get diagnostic submissions with admin authentication

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { username, password, action, submissionId } = JSON.parse(event.body);

        // Validate credentials
        const { data: adminUser, error: authError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('username', username)
            .eq('password', password)
            .single();

        if (authError || !adminUser) {
            return {
                statusCode: 401,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Invalid credentials' })
            };
        }

        // Update last login
        await supabase
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', adminUser.id);

        // Handle different actions
        if (action === 'list') {
            // Get all submissions with user data
            const { data: submissions, error: submissionsError } = await supabase
                .from('diagnostic_submissions')
                .select(`
                    *,
                    diagnostic_users (
                        id,
                        name,
                        email,
                        email_consent
                    )
                `)
                .order('created_at', { ascending: false });

            if (submissionsError) {
                throw submissionsError;
            }

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: true,
                    submissions: submissions
                })
            };
        } else if (action === 'detail' && submissionId) {
            // Get specific submission with full details
            const { data: submission, error: detailError } = await supabase
                .from('diagnostic_submissions')
                .select(`
                    *,
                    diagnostic_users (
                        id,
                        name,
                        email,
                        email_consent
                    )
                `)
                .eq('id', submissionId)
                .single();

            if (detailError) {
                throw detailError;
            }

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: true,
                    submission: submission
                })
            };
        } else {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Invalid action' })
            };
        }

    } catch (error) {
        console.error('Error in get-submissions:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                details: error.message
            })
        };
    }
};
