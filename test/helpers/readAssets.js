import readAsset from "./readAsset.js";

export default function readAssets(compiler, stats) {
  const assets = {};

  Object.keys(stats.compilation.assets).forEach((asset) => {
    assets[asset] = readAsset(asset, compiler, stats);
  });

  return assets;
}
