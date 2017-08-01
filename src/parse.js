const FrontMatter = require('front-matter');
const Remarkable = require('remarkable');
const Parser = new Remarkable();

/**
 * Parse a code block to have a source and a run code
 * 
 * @param   {string} code - Raw JSX code
 * @returns {string}      - Code block with souce and run code
 */
function wrapJSX(code) {
    return `
        <div class="example">
            ${code}
        </div>
    `
}

/**
 * Parse Markdown to HTML with code blocks
 * 
 * @param   {object} markdown - Markdown attributes and body
 * @returns {object}          - HTML and imports
 */
function parseMarkdown(markdown) {
    return new Promise((resolve, reject) => {
        Parser.set({
            xhtmlOut: true
        })

        Parser.renderer.rules.fence_custom.render = (tokens, idx, options) => {
            return wrapJSX(
                tokens[idx].content
            )
        }

        try {
            let html = Parser.render(markdown.body)
            resolve({ html, attributes: markdown.attributes })

        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * Parse markdown and return the body and imports
 * 
 * @param   {string} markdown - Markdown string to be parsed
 * @returns {object}          - HTML and imports
 */
module.exports = function(markdown) {
    return parseMarkdown(
        FrontMatter(markdown)
    )
}
