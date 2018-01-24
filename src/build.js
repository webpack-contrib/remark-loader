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
        jsx = resolved.content

    jsx = jsx.replace(/class=/g, 'className=') // Please react
    jsx = jsx.replace(/(<(?:img|hr)[^>]*)>/g, '$1 />') // Please react
    jsx = jsx.replace(/&#x3C;/g, '<') // Fix escaped react elements
    jsx = jsx.replace(/<p>(<[A-Z][\s\S]*?)<\/p>/g, '$1') // Remove surrounding p tags from components
    jsx = jsx.replace('export default ', '') // Remove lead-in from html-loader
    jsx = jsx.slice(1, jsx.length - 2) // Remove quotes from around JSX
    jsx = jsx.replace(/\\"" \+ (require\(".+?"\)) \+ "\\"/g, '{ $1 }') // Wrap html-loader `require`s
    jsx = jsx.replace(/\\"/g, '"') // Unescape quotes
    jsx = jsx.replace(/\\n/g, '\n') // Unescape newlines
    jsx = jsx.replace(/<code.+?>([\s\S]+?)<\/code>/g, (match, content, offset, string) => {
        return (
            match
                .replace(/{/g, '{ "{" }')
                .replace(/\n/g, '{ "\\n" }') // Inject react/jsx compatible newlines for code
        )
    })

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

    content += imports.map(item => (
        `import ${item.import} from '${item.path}'`
    )).join('\n')

    content += `   
    let Markdown = props => (
        <div>
            ${ jsx }
        </div>
    )
    `

    if (template) content += `
    export default props => (
        <Template
            { ...props }
            attributes={ ${JSON.stringify(resolved.attributes)} }
            markdown={ Markdown } />
    )
    `
    
    else content += `
    export default Markdown
    `

    return { attributes: resolved.attributes, content }
}
