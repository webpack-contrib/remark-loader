const Utils = require('loader-utils')
const HTMLLoader = require('html-loader')
const parse = require('./parse.js')

/**
 * Primary loader function
 *
 * @param {string} content - Markdown file content
 */
module.exports = function(content) {
    const callback = this.async()
    const options = Utils.getOptions(this)

    const { htmlLoaderOptions } = (options || {});

    let attributes

    parse(content, options)
        .then(processed => {
            attributes = processed.attributes

            const options = Object.assign({}, htmlLoaderOptions, { esModule: true })
            const context = Object.assign({}, this, { query: options })

            return HTMLLoader.call(
                context,
                processed.content
            )
        })
        .then(resolved => {
            callback(
                null,
                `${resolved}\n;export const attributes = ${JSON.stringify(attributes)};`
            )
        })
        .catch(callback)
};
