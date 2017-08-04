const FrontMatter = require('front-matter')
const Remark = require('remark')
const RemarkHTML = require('remark-html')
const RemarkReact = require('remark-react')
const React = require('react')
const Report = require('vfile-reporter')

/**
 * Parse markdown and return the body and imports
 * 
 * @param   {string} markdown - Markdown string to be parsed
 * @param   {object} options  - Options passed to the loader
 * @returns {object}          - HTML and imports
 */
module.exports = function(markdown, options = {}) {
    let { plugins = [] } = options,
        parsed = FrontMatter(markdown)

    return new Promise((resolve, reject) => {
        plugins
            .reduce((remark, item) => {
                return remark.use(item)
            }, Remark())
            .use(RemarkHTML) // RECONSIDER: options.output === 'html' ? RemarkHTML : RemarkReact)
            .process(parsed.body, (err, file) => {
                let result = {
                    content: file.contents,
                    attributes: parsed.attributes
                }

                if (err) {
                    reject( Report(err || file) )

                } else resolve( result )
            })
    })
}
