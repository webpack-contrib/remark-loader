const Parse = require('./parse.js')
const Build = require('./build.js')

/**
 * Primary loader function
 * 
 * @param {string} content - Markdown file content
 */
module.exports = function(content) {
    const callback = this.async()

    Parse(content)
        .then(Build)
        .then(component => callback(null, component))
        .catch(callback)
};
