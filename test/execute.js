const Module = require('module');
const path = require('path');

const parentModule = module;

module.exports = (asset, compiler, stats) => {
  const usedFs = compiler.outputFileSystem;
  const outputPath = stats.compilation.outputOptions.path;

  const source = usedFs.readFileSync(path.join(outputPath, asset)).toString();

  const resource = 'test.js';
  const mod = new Module(resource, parentModule);

  mod.paths = Module._nodeModulePaths(
    path.resolve(__dirname, '../fixtures')
  );
  mod.filename = resource;

  mod._compile(source, resource);

  return mod.exports;
};
