module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  extends: ["@webpack-contrib/eslint-config-webpack", "prettier"],
  overrides: [
    {
      files: ["test/**/*.js", "test/**/.*.js"],
      parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: true,
      },
      // globals: {
      //   __dirname: "off",
      //   __filename: "off",
      //   exports: "off",
      //   module: "off",
      //   require: "off",
      // },
      settings: {
        "import/extensions": [".mjs", ".cjs", ".js"],
        "import/ignore": ["\\.(coffee|scss|css|less|hbs|svg|json|md)$"],
        "import/resolver": {
          node: {
            extensions: [".mjs", ".cjs", ".js", ".jsx", ".json", ".node"],
          },
        },
      },
      plugins: ["import"],
      rules: {
        "import/extensions": [
          "error",
          "always",
          {
            ignorePackages: true,
          },
        ],
        "import/no-useless-path-segments": [
          "error",
          {
            noUselessIndex: false,
          },
        ],

        "no-import-assign": "error",
        "import/no-extraneous-dependencies": [
          "error",
          { packageDir: __dirname },
        ],
      },
    },
  ],
};
