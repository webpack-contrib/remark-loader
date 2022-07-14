const { execute, readAsset } = require("./index.js");

module.exports = (asset, compiler, stats) =>
  execute(readAsset(asset, compiler, stats));
