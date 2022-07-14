const compile = require("./compile.js");
const execute = require("./execute.js");
const getExecutedCode = require("./getExecutedCode.js");
const getCompiler = require("./getCompiler.js");
const getErrors = require("./getErrors.js");
const getWarnings = require("./getWarnings.js");
const normalizeErrors = require("./normalizeErrors.js");
const readAsset = require("./readAsset.js");
const readsAssets = require("./readAssets.js");

module.exports = {
  compile,
  execute,
  getExecutedCode,
  getCompiler,
  getErrors,
  getWarnings,
  normalizeErrors,
  readAsset,
  readsAssets,
};
