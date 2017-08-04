/**
 * Builds the component.jsx file with dependencies
 * 
 * @param   {object} resolved - Resolved HTML and frontmatter attributes
 * @returns {string}          - React Component
 */
module.exports = function(resolved) {
    let { template, imports: nestedImports = {} } = resolved.attributes,
        imports = [{ import: 'React', path: 'react' }],
        content = '',
        jsx = (
            resolved.content
                .replace(/class=/g, 'className=') // Please react
                .replace(/(<(?:img|hr)[^>]*)>/g, '$1 />') // Please react
                .replace(/&#x3C;/g, '<') // Fix escaped react elements
                .replace(/<p>(<[A-Z][\s\S]*?)<\/p>/g, '$1') // Remove surrounding p tags from components
        )

    for (var key in nestedImports) {
        if ( nestedImports.hasOwnProperty(key) ) {
            imports.push({
                import: key,
                path: nestedImports[key]
            })
        }
    }

    if (template) {
        imports.push({ import: 'Template', path: template })
    }

    content += imports.map(item => `import ${item.import} from '${item.path}'`).join('\n')

    let test = jsx.replace('module.exports = ', '')
    test = test.slice(1, test.length - 2)
    test = test.replace(/\\"" \+ (require\(".+?"\)) \+ "\\"/g, '{ $1 }')
    // console.log( eval(test) )

    content += `   
    let Markdown = props => (
        <div>
            ${ test.replace(/\\"/g, '"').replace(/\\n/g, `
`) }
        </div>
    )
    `

    if (template) content += `
    export default props => (
        <Template markdown={ Markdown } />
    )
    `
    
    else content += `
    export default Markdown
    `

    return { attributes: resolved.attributes, content }
}
