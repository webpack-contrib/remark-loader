import path from "path";

import webpack from "webpack";
import { createFsFromVolume, Volume } from "memfs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (fixture, loaderOptions = {}, config = {}) => {
  const fullConfig = {
    mode: "development",
    devtool: config.devtool || false,
    context: path.resolve(__dirname, "../fixtures"),
    entry: path.resolve(__dirname, "../fixtures", fixture),
    output: {
      path: path.resolve(__dirname, "../outputs"),
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
              loader: path.resolve(__dirname, "./testLoader.cjs"),
            },
            {
              loader: path.resolve(__dirname, "../../dist/cjs.js"),
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
