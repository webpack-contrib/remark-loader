<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# Remark Loader

Load markdown through `remark` with built-in image resolution.

## Usage

Simply add the loader to your configuration, and pass options.

**webpack.config.js**

```js
import RemarkKbd from 'remark-kbd';

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
              plugins: [RemarkKbd],
            },
          },
        ],
      },
    ],
  },
};
```

Here's the full list of [`remark` plugins][1].

We no longer support any `react` specific features.
Please see the wonderful [MDX][12] project if you're interested in mixing JSX with Markdown.

## Inspiration

This project was inspired the following open source work:

- [`react-markdown-loader`][6]
- [`marksy`][7]

## Examples

### Markdown to HTML

To get html, need to add [`remark-html`][3] to the remark plugins and add [`html-loader`][5] to the `webpack.config`

```js
import 'markdown-file.md';
```

**webpack.config.js**

```js
import RemarkKbd from 'remark-kbd';
import RemarkHTML from 'remark-html';

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'remark-loader',
            options: {
              plugins: [RemarkKbd, RemarkHTML],
            },
          },
        ],
      },
    ],
  },
};
```

### Markdown to Markdown

**index.js**

```js
import 'markdown-file.md';
```

**webpack.config.js**

```js
import RemarkKbd from 'remark-kbd';

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
              plugins: [RemarkKbd],
            },
          },
        ],
      },
    ],
  },
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

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
[npm]: https://img.shields.io/npm/v/remark-loader.svg
[npm-url]: https://npmjs.com/package/remark-loader
[node]: https://img.shields.io/node/v/remark-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/remark-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/remark-loader
[tests]: https://github.com/webpack-contrib/remark-loader/workflows/remark-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/remark-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/remark-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/remark-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=remark-loader
[size-url]: https://packagephobia.now.sh/result?p=remark-loader
