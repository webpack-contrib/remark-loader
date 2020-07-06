// from https://webpack.js.org/contribute/writing-a-loader/#testing
const path = require('path');
const webpack = require('webpack');
const { createFsFromVolume, Volume } = require('memfs');

module.exports.getCompiler = (fixture, options = {}) => {
  const compiler = webpack({
    mode: 'development',
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname, '../outputs'),
      filename: 'bundle.js',
      libraryTarget: "commonjs"
    },
    module: {
      rules: [{
        test: /\.md$/,
        use: {
          loader: path.resolve(__dirname, '../src/index.js'),
          options
        }
      }]
    }
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return compiler;
};

module.exports.compile = (compiler) => new Promise((resolve, reject) => {
  compiler.run((err, stats) => {
    if (err) reject(err);
    if (stats.hasErrors()) reject(new Error(stats.toJson().errors));

    resolve(stats);
  });
});