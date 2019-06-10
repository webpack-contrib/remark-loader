[![NPM Version][7]][5]
[![Standard Version][8]][6]

Remark Loader
=============

Load markdown through remark with image resolving and some react-specific 
features.


## Usage

Simply add the loader to your configuration, and pass options.

__webpack.config.js__

``` js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          { 
            loader: 'remark-loader', 
            options: {
              plugins: [
                require('remark-kbd')
              ]
            }
          }
        ]
      }
    ]
  }
}
```

Here's the full list of [`remark` plugins][1]. Note that [`remark-html`][3] 
is always included as the last plugin and should not be included in the 
`plugins` list.

> Note that this loader makes use of the [`html-loader`][5] under the hood. 
The output, without the `react` option enabled, is the default output for 
the `html-loader`.

There is one more option called `react`. This option causes the loader to 
emit a JSX module that __must be loaded through the `babel-loader`__. This 
feature is more of a test and __should not be considered safe or reliable__ -- 
it's most likely riddled with bugs and weird edge case failures ;). That 
said, it enables some cool new features that should really be added via some 
sort of `remark` plugin, e.g. [`remark-react`][4].

__webpack.config.js__

``` diff
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
+         'babel-loader'
          { 
            loader: 'remark-loader', 
            options: {
+             react: true,
              plugins: [
                require('remark-kbd')
              ]
            }
          }
        ]
      }
    ]
  }
}
```

Now, in your markdown files, you can take advantage of two new YAML 
frontmatter attributes:

__src/pages/index.md__

``` md
---
title: An Interactive Page
template: '../components/template'
imports:
  Selector: '../components/selector'
---

This page will now be wrapped in the given `template`. The `template` 
will receive a component containing this markdown via a `markdown` prop. 
You can pass the `Markdown` component props that will then be available 
for dynamic insertion here!

For example, let's insert `props.person` within the following blockquote:

> Hello { props.person }!

Not too shabby, huh? Note that for technical reasons you can only 
dynamically insert values within content (or components as shown below).

You can also use any components from the given `imports`. Let's say you 
had an interactive `Selector` component, you could render it here, while 
still allowing the parent template to maintain control of its state and 
callbacks:

<Selector
  value={ props.selection }
  options={ props.options }
  onChange={ props.onSelect } />
```

__src/components/template.jsx__

``` md
import React from 'react'

export default class Template extends React.Component {
  state = {
    selection: null
  }

  render() {
    let { markdown: Markdown } = this.props

    return (
      <Markdown
        person="John Doe"
        selection={ this.state.selection }
        options={[ 'French', 'Dutch', 'German', 'Japanese' ]}
        onSelect={ this._changeSelection } />
    )
  }

  _changeSelection = option => {
    this.setState({
      selection: option
    })
  }
}
```

> Note that these features are optional, meaning that not every markdown file 
> being processed has to take advantage of them. Also note that this will cause 
> the loader to output a JSX module that will have to be processed further by the 
> `babel-loader` or another transpiler that can handle the conversion of JSX to 
> react statements.

_This hack works for now but I'm hoping to discuss these features with the `remark` 
and `remark-react` maintainers to brainstorm a more stable implementation. If you 
have ideas, please create an issue so we can discuss._


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please 
[create an issue][2].


## Inspiration

This project was inspired the following open source work:

- [`react-markdown-loader`][6]
- [`marksy`][7]


## License

MIT (c) 2017


[1]: https://github.com/wooorm/remark/blob/master/doc/plugins.md
[2]: https://github.com/skipjack/remark-loader/issues
[3]: https://github.com/wooorm/remark-html
[4]: https://github.com/mapbox/remark-react
[5]: https://github.com/webpack-contrib/html-loader
[6]: https://github.com/javiercf/react-markdown-loader
[7]: https://github.com/cerebral/marksy
[5]: https://www.npmjs.com/package/react-banner
[6]: https://github.com/conventional-changelog/standard-version
[7]: https://img.shields.io/npm/v/react-banner.svg
[8]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
