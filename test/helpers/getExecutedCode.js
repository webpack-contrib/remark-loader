import { execute, readAsset } from "./index";

export default (asset, compiler, stats) =>
  execute(readAsset(asset, compiler, stats));
