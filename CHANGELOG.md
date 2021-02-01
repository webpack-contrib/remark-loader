# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/webpack-contrib/remark-loader/compare/v2.0.0...v3.0.0) (2021-02-01)


### ⚠ BREAKING CHANGES

* minimum supported `webpack` version is `5`

## [2.0.0](https://github.com/webpack-contrib/remark-loader/compare/v1.0.1...v2.0.0) (2020-11-24)


### ⚠ BREAKING CHANGES

* `remark` is now in peer dependencies , so you need to install `remark` itself, please read `remark` [changelog](https://github.com/remarkjs/remark/releases) before updating `remark`, there are a lot of breaking changes

### Features

* allow to use `remark@12` and `remark@13` (other versions is not tested, but it may work too)

### [1.0.1](https://github.com/webpack-contrib/remark-loader/compare/v1.0.0...v1.0.1) (2020-10-09)

### Chore

* update `schema-utils`

## [1.0.0](https://github.com/webpack-contrib/remark-loader/compare/v1.0.0-rc.0...v1.0.0) (2020-08-06)


### ⚠ BREAKING CHANGES

* minimum required `Node.js` version is `10.13.0`
* minimum required webpack version is `4`
* loader doesn't return HTML, you need to use `html-loader`, please look at [this example](https://github.com/webpack-contrib/remark-loader#markdown-to-html)
* update `remark` to `12.0.0` version, some plugins can be incompatible, please update them


### Features

* added `remarkOptions` option, you can specify `plugins`, `settings` and `data`
* added `removeFrontMatter` option ([#19](https://github.com/webpack-contrib/remark-loader/issues/19)) ([3550105](https://github.com/webpack-contrib/remark-loader/commit/3550105c774caa9aa4f4fc58e6fa23b5eb30c332))
* validate options by default ([c6b6ed2](https://github.com/webpack-contrib/remark-loader/commit/c6b6ed2f18f89c085a80ebe0db6d7adbfcc26e26))


### Bug Fixes

* improved performance


<a name="1.0.0-rc.0"></a>
# [1.0.0-rc.0](https://github.com/skipjack/remark-loader/compare/v0.3.2...v1.0.0-rc.0) (2019-06-10)


### Chores

* remove react specific code ([f4e64c4](https://github.com/skipjack/remark-loader/commit/f4e64c4)), closes [#1](https://github.com/skipjack/remark-loader/issues/1)


### BREAKING CHANGES

* The `react` option has been removed. Our implementation
was extremely hacky and led to a bunch of pitfalls. Please use MDX as an
alternative.



<a name="0.3.2"></a>
## [0.3.2](https://github.com/skipjack/remark-loader/compare/v0.3.1...v0.3.2) (2018-02-06)


### Bug Fixes

* **react:** make `<br>` tags self-closing ([8c1f754](https://github.com/skipjack/remark-loader/commit/8c1f754))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/skipjack/remark-loader/compare/v0.3.0...v0.3.1) (2018-01-24)


### Bug Fixes

* allow specified `template` to receive any higher-level `props` ([b365efa](https://github.com/skipjack/remark-loader/commit/b365efa))
* use ES6 module syntax for the output modules ([d550fa4](https://github.com/skipjack/remark-loader/commit/d550fa4))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/skipjack/remark-loader/compare/v0.2.3...v0.3.0) (2017-08-10)


### Features

* allow users to pass plugins ([0f125c0](https://github.com/skipjack/remark-loader/commit/0f125c0))
* **react:** provide YAML attributes to templates ([8072585](https://github.com/skipjack/remark-loader/commit/8072585))



<a name="0.2.3"></a>
## [0.2.3](https://github.com/skipjack/remark-loader/compare/v0.2.2...v0.2.3) (2017-08-08)


### Bug Fixes

* **react:** fix syntax error in build script ([cb951f6](https://github.com/skipjack/remark-loader/commit/cb951f6))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/skipjack/remark-loader/compare/v0.2.1...v0.2.2) (2017-08-08)


### Bug Fixes

* **react:** fix missing newline and bracket usage in code blocks ([4f05570](https://github.com/skipjack/remark-loader/commit/4f05570))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/skipjack/remark-loader/compare/v0.2.0...v0.2.1) (2017-08-04)


### Bug Fixes

* **deps:** update dependencies in package.json ([c42c645](https://github.com/skipjack/remark-loader/commit/c42c645))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/skipjack/remark-loader/compare/v0.1.0...v0.2.0) (2017-08-04)


### Features

* resolve local resources using the html-loader ([77ac7b2](https://github.com/skipjack/remark-loader/commit/77ac7b2))
* switch to remark parser allowing plugins and output options to be passed ([d8fbcef](https://github.com/skipjack/remark-loader/commit/d8fbcef))
* **react:** re-integrate the react build script ([35cd6f7](https://github.com/skipjack/remark-loader/commit/35cd6f7))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/skipjack/remark-loader/releases/tag/v0.1.0) (2017-08-01)

Port and refactor the repository from [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader). Still working on the switching over to [`remark`](https://github.com/wooorm/remark) over [`remarkable`](https://github.com/jonschlinkert/remarkable).
