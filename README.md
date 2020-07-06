[![NPM Version][10]][8]
[![Standard Version][11]][9]

Remark Loader
=============

Load markdown through `remark` with built-in image resolution.


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

Frontmatter values are assigned to an object exported as `attributes`. For
example, if you have this markdown file:

```md
---
title: a clever remark
---
hello world!
```

You can use it like this:

```js
import contents, { attributes } from './test.md'

console.log(contents) // logs "hello world!"
console.log(attributes) // logs "{ title: 'a clever remark' }"
```

> This loader makes use of [`html-loader`][5] under the hood. You can
> forward options to it via `htmlLoaderOptions`:
> ```js
> {
>   loader: 'remark-loader',
>   options: {
>     htmlLoaderOptions: {
>       minimize: false
>     }
>   }
> }
> ```
> The `esModule` option will always be `true` to ensure frontmatter values from
> the markdown are correctly exported.

We no longer support any `react` specific features. Please see the wonderful
[MDX][12] project if you're interested in mixing JSX with Markdown.


## Contributing

Pull requests and stars are always welcome. For bugs and feature requests,
please [create an issue][2].


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
[8]: https://www.npmjs.com/package/remark-loader
[9]: https://github.com/conventional-changelog/standard-version
[10]: https://img.shields.io/npm/v/remark-loader.svg
[11]: https://img.shields.io/badge/release-standard%20version-brightgreen.svg
[12]: https://mdxjs.com/