<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# Remark Loader

Load markdown through `remark`.

## Usage

Simply add the loader to your configuration, and pass options.

```js
import md from "markdown-file.md";

console.log(md);
```

**webpack.config.js**

```js
import RemarkHTML from "remark-html";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ],
      },
    ],
  },
};
```

Here's the full list of [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md).

We no longer support any `react` specific features.
Please see the wonderful [MDX](https://mdxjs.com/) project if you're interested in mixing JSX with Markdown.

## Options

- **[`remarkOptions`](#remarkOptions)**
- **[`removeFrontMatter`](#removeFrontMatter)**

### remarkOptions

Remark options

Type:

```ts
type remarkOptions = {
  plugins: Array<string | Array>;
  settings: Object;
  data: Object;
};
```

- **[`plugins`](#plugins)**
- **[`settings`](#settings)**
- **[`data`](#data)**

#### plugins

Allows to connect [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md)
Type:

```ts
type plugins = Array<string | Array>;
```

Default: `[]`

Allows to connect [`remark` plugins](https://github.com/wooorm/remark/blob/master/doc/plugins.md)

##### string

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkFrontmatter],
              },
            },
          },
        ],
      },
    ],
  },
};
```

##### array

If need to specify options for the plugin, can pass the plugin using an array, where the second argument will be options.

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";
import RemarkBookmarks from "remark-bookmarks";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [
                  RemarkFrontmatter,
                  [
                    RemarkBookmarks,
                    {
                      bookmarks: {
                        npm: "https://npmjs.com/package/remark-bookmarks",
                      },
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### settings

Remark settings  
Type:

```ts
type settings = Object;
```

Default: `undefined`

Pass [`remark-stringify` options](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#options) and [`remark-parse` options](https://github.com/remarkjs/remark/tree/main/packages/remark-parse#options) options to the `remark`.

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
            loader: "remark-loader",
            options: {
              remarkOptions: {
                settings: {
                  bullet: "+",
                  listItemIndent: "1",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

#### data

Information available to all plugins  
Type:

```ts
type data = Object;
```

Default: `undefined`

Configure the [`remark`](https://github.com/unifiedjs/unified#processordatakey-value) with information available to all plugins.
Information is stored in an in-memory key-value store.

**webpack.config.js**

```js
function examplePluginUsingData() {
  console.log(this.data);
  // { alpha: 'bravo', charlie: 'delta' }
}

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [examplePluginUsingData],
                data: {
                  alpha: "bravo",
                  charlie: "delta",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

### removeFrontMatter

Remove removeFrontMatter

Type:

```ts
type removeFrontMatter = boolean;
```

Default: `true`

By default, the frontMatter is removed.
To override this behavior, set `removeFrontMatter` to `false` and add `remark-frontmatter` to plugins.

**webpack.config.js**

```js
import RemarkFrontmatter from "remark-frontmatter";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "remark-loader",
            options: {
              removeFrontMatter: false,
              remarkOptions: {
                plugins: [RemarkFrontmatter],
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Inspiration

This project was inspired the following open source work:

- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader)
- [`marksy`](https://github.com/cerebral/marksy)

## Examples

### Markdown to HTML

To get html, need to add [`remark-html`](https://github.com/wooorm/remark-html) to the remark plugins and add [`html-loader`](https://github.com/webpack-contrib/html-loader) to the `webpack.config`

```js
import md from "markdown-file.md";
console.log(md);
```

**webpack.config.js**

```js
import RemarkHTML from "remark-html";

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
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
import md from "markdown-file.md";
console.log(md);
```

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
            loader: "remark-loader",
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

[npm]: https://img.shields.io/npm/v/remark-loader.svg
[npm-url]: https://npmjs.com/package/remark-loader
[node]: https://img.shields.io/node/v/remark-loader.svg
[node-url]: https://nodejs.org
[tests]: https://github.com/webpack-contrib/remark-loader/workflows/remark-loader/badge.svg
[tests-url]: https://github.com/webpack-contrib/remark-loader/actions
[cover]: https://codecov.io/gh/webpack-contrib/remark-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/remark-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=remark-loader
[size-url]: https://packagephobia.now.sh/result?p=remark-loader
