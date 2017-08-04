const Utils = require('loader-utils')
const HTMLLoader = require('html-loader')
const Parse = require('./parse.js')

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
        .then(resolved => callback(null, resolved.content))
        .catch(callback)
};
