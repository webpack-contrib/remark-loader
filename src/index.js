const Utils = require('loader-utils')
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
        .then(processed => callback(null, processed.content))
        .catch(callback)
};
