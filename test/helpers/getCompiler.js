import path from "path";
import { fileURLToPath } from "url";

import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(dirname, "../fixtures"),
    entry: path.resolve(dirname, "../fixtures", fixture),
    output: {
      path: path.resolve(dirname, "../outputs"),
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      library: "remarkLoaderExport",
    },
    module: {
      rules: [
        {
          test: /\.md$/i,
          rules: [
            {
              loader: path.resolve(dirname, "./testLoader.cjs"),
            },
            {
              loader: path.resolve(dirname, "../../src/cjs.js"),
              options: loaderOptions || {},
            },
          ],
        },
      ],
    },
    plugins: [],
    ...config,
  };

  const compiler = webpack(fullConfig);

  if (!config.outputFileSystem) {
    compiler.outputFileSystem = createFsFromVolume(new Volume());
  }

  return compiler;
};
