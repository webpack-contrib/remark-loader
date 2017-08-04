const Utils = require('loader-utils')
const HTMLLoader = require('html-loader')
const Parse = require('./parse.js')
const Build = require('./build.js')

/**
 * Primary loader function
 * 
 * @param {string} content - Markdown file content
 */
module.exports = function(content) {
    const callback = this.async()
    const options = Utils.getOptions(this)

    Parse(content, options)
        // TODO: Refactor this hack -- we should probably just intercept images in the tree
        .then(processed => Object.assign({}, processed, {
            content: HTMLLoader(processed.content)
        }))
        // TODO: Ideally this should be enabled via remark-react or another plugin (discuss with the author)
        .then(resolved => options.react ? Build(resolved) : resolved)
        .then(resolved => callback(null, resolved.content))
        .catch(callback)
};
