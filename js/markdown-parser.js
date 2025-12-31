/**
 * X2 Method - Markdown Parser
 * Simple markdown to HTML converter for web display
 */

const MarkdownParser = {
    /**
     * Convert markdown text to HTML
     * @param {string} text - Markdown text
     * @returns {string} HTML text
     */
    parse(text) {
        if (!text) return '';
        
        let html = text;
        
        // Convert **bold** to <strong>
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Convert *italic* to <em>
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Convert line breaks to <br> (but not double line breaks which are paragraphs)
        // First, protect double line breaks
        html = html.replace(/\n\n/g, '§PARAGRAPH§');
        // Convert single line breaks
        html = html.replace(/\n/g, '<br>');
        // Restore paragraphs
        html = html.replace(/§PARAGRAPH§/g, '</p><p>');
        
        // Wrap in paragraph tags if not already wrapped
        if (!html.startsWith('<p>')) {
            html = '<p>' + html + '</p>';
        }
        
        return html;
    },
    
    /**
     * Strip markdown formatting (for plain text output)
     * @param {string} text - Markdown text
     * @returns {string} Plain text
     */
    stripMarkdown(text) {
        if (!text) return '';
        
        let plain = text;
        
        // Remove bold markers
        plain = plain.replace(/\*\*/g, '');
        
        // Remove italic markers
        plain = plain.replace(/\*/g, '');
        
        return plain;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MarkdownParser };
}
