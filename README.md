[![NPM Version][10]][8]
[![Standard Version][11]][9]

# Remark Loader

Load markdown through `remark` with built-in image resolution.

## Usage

Simply add the loader to your configuration, and pass options.

**webpack.config.js**

```js
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
              plugins: [require('remark-kbd')],
            },
          },
        ],
      },
    ],
  },
};
```

Here's the full list of [`remark` plugins][1]. Note that [`remark-html`][3]
is always included as the last plugin and should not be included in the
`plugins` list.

> This loader makes use of the [`html-loader`][5] under the hood.

We no longer support any `react` specific features. Please see the wonderful
[MDX][12] project if you're interested in mixing JSX with Markdown.

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
