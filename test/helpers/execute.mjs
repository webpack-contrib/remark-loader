import Module from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (code) => {
  const resource = "test.js";
  const module = new Module(resource);

  module.paths = Module._nodeModulePaths(
    path.resolve(__dirname, "../fixtures"),
  );
  module.filename = resource;

  module._compile(
    `let __export__;${code};module.exports = __export__;`,
    resource,
  );

  return module.exports;
};
