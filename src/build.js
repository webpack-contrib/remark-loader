/**
 * Builds the component.jsx file with dependencies
 * 
 * @param   {object} markdown - HTML and imports
 * @returns {string}          - React Component
 */
module.exports = function(markdown) {
    let { template, imports: nestedImports = {} } = markdown.attributes,
        jsx = markdown.html.replace(/class=/g, 'className='),
        imports = [{ import: 'React', path: 'react' }]

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

        return `
            ${ imports.map(item => `import ${item.import} from '${item.path}'`).join('\n') }

            let Markdown = props => (
                <div>
                    ${jsx}
                </div>
            )

            export default props => (
                <Template markdown={ Markdown } />
            )
        `

    } else return `
        ${ imports.map(item => `import ${item.import} from '${item.path}'`).join('\n') }

        export default props => (
            <div>
                ${jsx}
            </div>
        )
    `
};
