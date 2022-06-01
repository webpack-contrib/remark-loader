import { execute, readAsset } from "./index.mjs";

export default (asset, compiler, stats) =>
  execute(readAsset(asset, compiler, stats));
