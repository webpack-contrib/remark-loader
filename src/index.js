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
        // @todo we should probably just intercept images in the tree
        // or recommend that the `html-loader` be chained
        .then(processed => {
            attributes = processed.attributes;
            return HTMLLoader.call(
                { query: Object.assign({}, htmlLoaderOptions, { esModule: true }) },
                processed.content
            )
        })
        .then(resolved => {
            const result = [
                resolved,
                ...Object.entries(attributes).map(([k,v]) => `export const ${k} = ${JSON.stringify(v)};`)
            ].join('\n')

            callback(null, result)
        })
        .catch(callback)
};
