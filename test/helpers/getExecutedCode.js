import { execute, readAsset } from "./index.js";

export default (asset, compiler, stats) =>
  execute(readAsset(asset, compiler, stats));
