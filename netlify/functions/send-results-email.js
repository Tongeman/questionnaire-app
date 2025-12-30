// send-results-email.js
// Netlify Function: Send diagnostic results email via Resend

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Map constraint categories to diagram images (if you have these)
const constraintDiagrams = {
    "Financial Control": "X2_Diagram_7.png",
    "Growth Strategy": "X2_Diagram_8.png",
    "Lifestyle & Exit Plan": "X2_Diagram_9.png",
    "Marketing & Leads": "X2_Diagram_6.png",
    "Selling & Salespeople": "X2_Diagram_5.png",
    "Service & Reputation": "X2_Diagram_4.png",
    "Drive Change": "X2_Diagram_1.png",
    "People Management": "X2_Diagram_3.png",
    "Systems & Automation": "X2_Diagram_2.png"
};

// Helper function to convert markdown to HTML
function markdownToHtml(markdown) {
    if (!markdown) return '';

    let html = markdown
        .replace(/^### (.*?)$/gm, '<h4 style="color: #1e3a5f; margin-top: 15px; margin-bottom: 10px;">$1</h4>')
        .replace(/^## (.*?)$/gm, '<h3 style="color: #1e3a5f; margin-top: 20px; margin-bottom: 10px;">$1</h3>')
        .replace(/^# (.*?)$/gm, '<h2 style="color: #1e3a5f; margin-top: 20px; margin-bottom: 10px;">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/^\* (.*?)$/gm, '<li style="margin-bottom: 5px;">$1</li>')
        .replace(/\n\n/g, '</p><p style="color: #555; line-height: 1.6; margin: 10px 0;">')
        .replace(/\n/g, '<br>');

    // Wrap lists
    html = html.replace(/(<li[^>]*>.*?<\/li>)+/gs, '<ul style="margin: 10px 0; padding-left: 20px;">$&</ul>');

    html = '<p style="color: #555; line-height: 1.6; margin: 0;">' + html + '</p>';

    return html;
}

// Helper function to get status color
function getStatusColor(status) {
    const statusLower = status.toLowerCase();
    if (statusLower === 'red') return '#dc3545';
    if (statusLower === 'amber') return '#f59e0b';
    if (statusLower === 'green') return '#10b981';
    return '#666';
}

// Helper function to get status background color
function getStatusBgColor(status) {
    const statusLower = status.toLowerCase();
    if (statusLower === 'red') return '#fdf2f2';
    if (statusLower === 'amber') return '#fffbeb';
    if (statusLower === 'green') return '#ecfdf5';
    return '#f3f4f6';
}

exports.handler = async (event, context) => {
    console.log('========================================');
    console.log('SEND-RESULTS-EMAIL HANDLER STARTED');
    console.log('========================================');

    if (event.httpMethod !== 'POST') {
        console.warn('Invalid HTTP method:', event.httpMethod);
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        console.log('Parsing request body...');
        const {
            userName,
            userEmail,
            contextAnswers,
            selectedConstraint,
            scores,
            fullReportMarkdown
        } = JSON.parse(event.body);

        // Log received data
        console.log('Data received:');
        console.log('  - userName:', userName);
        console.log('  - userEmail:', userEmail);
        console.log('  - selectedConstraint:', selectedConstraint?.category || 'MISSING');
        console.log('  - fullReportMarkdown:', fullReportMarkdown ? `(${fullReportMarkdown.length} chars)` : 'MISSING');

        // Validate required fields
        if (!userName || !userEmail) {
            console.error('Validation failed: Missing userName or userEmail');
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        console.log('Validation passed');
        console.log('Building email sections...');

        // Build Business Profile section
        const businessProfileHtml = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #1e3a5f; margin-top: 0; margin-bottom: 15px; font-size: 22px;">Your Business Profile</h2>
                <p style="margin: 8px 0; color: #333;"><strong>Name:</strong> ${contextAnswers?.name || 'Not provided'}</p>
                <p style="margin: 8px 0; color: #333;"><strong>Business:</strong> ${contextAnswers?.business_name || 'Not provided'}</p>
                <p style="margin: 8px 0; color: #333;"><strong>What you do:</strong> ${contextAnswers?.business_description || 'Not provided'}</p>
                <p style="margin: 8px 0; color: #333;"><strong>Revenue:</strong> ${contextAnswers?.annual_revenue || 'Not provided'}</p>
                <p style="margin: 8px 0; color: #333;"><strong>Hours per week:</strong> ${contextAnswers?.hours_per_week || 'Not provided'}</p>
            </div>
        `;
        console.log('Business Profile section built');

        // Build Diagram section (if constraint is available)
        let diagramHtml = '';
        if (selectedConstraint && selectedConstraint.category) {
            const cleanConstraintName = selectedConstraint.category.trim();
            const diagramFilename = constraintDiagrams[cleanConstraintName];

            if (diagramFilename) {
                // Update this URL to your actual domain
                const diagramUrl = `https://x2diagnostic.netlify.app/images/${diagramFilename}`;
                diagramHtml = `
                    <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0; text-align: center;">
                        <h2 style="color: #1e3a5f; margin-top: 0; margin-bottom: 20px; font-size: 22px;">Your Primary Constraint</h2>
                        <img src="${diagramUrl}" alt="X2 Method Diagram - ${cleanConstraintName}" style="max-width: 100%; height: auto; border-radius: 8px;">
                    </div>
                `;
                console.log('Diagram section built for:', cleanConstraintName);
            } else {
                console.warn('Diagram not found for:', cleanConstraintName);
            }
        }

        // Build main report content
        let reportHtml = '';
        if (fullReportMarkdown) {
            const formattedReport = markdownToHtml(fullReportMarkdown);
            reportHtml = `
                <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
                    ${formattedReport}
                </div>
            `;
            console.log('Report section built from fullReportMarkdown');
        } else {
            console.error('fullReportMarkdown is missing - using fallback');
            reportHtml = `
                <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
                    <p style="color: #dc3545;">Full report data was not available. Please contact support.</p>
                </div>
            `;
        }

        console.log('Assembling complete email HTML...');

        // Build complete email HTML
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #1e3a5f; margin-bottom: 10px; font-size: 28px;">Your X2 Business Growth Diagnostic</h1>
                    <p style="color: #666; font-size: 16px; margin: 0;">Personalised Results for ${userName}</p>
                </div>

                ${businessProfileHtml}
                ${diagramHtml}
                ${reportHtml}

                <!-- Signature Section -->
                <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #e0e0e0; color: #555;">
                    <div style="font-size: 14px; line-height: 1.4;">
                        <div style="margin-bottom: 12px;">
                            <strong style="color: #333;">David Tongeman</strong>
                            <span style="color: #999;"> | </span>
                            <span style="color: #666;">X2 Method Community Manager</span>
                        </div>
                        <div>
                            <a href="https://x2method.com" style="color: #1e3a5f; text-decoration: none; margin-right: 12px;">x2method.com</a>
                            <span style="color: #999;">•</span>
                            <span style="color: #666; margin-left: 12px;">01482 778688</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 12px;">
                    <p style="margin: 5px 0;">X2 Method - Business Growth Strategies</p>
                    <p style="margin: 5px 0;">This analysis was generated specifically for you based on your diagnostic responses.</p>
                </div>
            </body>
            </html>
        `;

        console.log('Email HTML assembled');
        console.log('Total HTML length:', emailHtml.length, 'characters');

        // Send email
        console.log('Sending email to:', userEmail);

        const emailConfig = {
            from: 'David Tongeman <david@reports.x2method.com>',
            to: userEmail,
            subject: 'Your X2 Business Growth Diagnostic Results',
            html: emailHtml,
            reply_to: 'david@x2method.com'
        };

        const data = await resend.emails.send(emailConfig);

        console.log('========================================');
        console.log('EMAIL SENT SUCCESSFULLY!');
        console.log('Message ID:', data.id);
        console.log('========================================');

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Email sent successfully',
                messageId: data.id
            })
        };

    } catch (error) {
        console.error('========================================');
        console.error('ERROR SENDING EMAIL!');
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        console.error('Stack trace:', error.stack);
        console.error('========================================');

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send email',
                details: error.message
            })
        };
    }
};
