const normalizeErrors = require("./normalizeErrors.js");

module.exports = (stats) => normalizeErrors(stats.compilation.warnings.sort());
