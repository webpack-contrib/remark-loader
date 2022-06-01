import normalizeErrors from "./normalizeErrors.mjs";

export default (stats) => normalizeErrors(stats.compilation.errors.sort());
