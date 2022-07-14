const path = require("path");

const {
  compile,
  getExecutedCode,
  getCompiler,
  getErrors,
  getWarnings,
} = require("./helpers/index.js");

describe("loader", () => {
  it("should work markdown to markdown", async () => {
    const compiler = getCompiler("simple.js");
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work markdown to html", async () => {
    const RemarkHTML = await require("remark-html");

    const compiler = getCompiler(
      "simple.js",
      {},
      {
        module: {
          rules: [
            {
              test: /\.md$/i,
              rules: [
                {
                  loader: path.resolve(__dirname, "./helpers/testLoader.cjs"),
                },
                {
                  loader: "html-loader",
                },
                {
                  loader: path.resolve(__dirname, "../dist/cjs.js"),
                  options: {
                    remarkOptions: {
                      plugins: [RemarkHTML],
                    },
                  },
                },
              ],
            },
          ],
        },
      }
    );
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work with the 'remark-gfm' plugin", async () => {
    const RemarkGFM = await require("remark-gfm");

    const compiler = getCompiler("simple.js", {
      remarkOptions: {
        plugins: [RemarkGFM],
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work if plugins are array", async () => {
    const RemarkBookmarks = await require("remark-bookmarks");

    const compiler = getCompiler("multipleArgs.js", {
      remarkOptions: {
        plugins: [
          [
            RemarkBookmarks,
            {
              bookmarks: {
                npm: "https://npmjs.com/package/remark-bookmarks",
              },
            },
          ],
        ],
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should not remove frontmatter", async () => {
    const RemarkFrontmatter = await require("remark-frontmatter");

    const compiler = getCompiler("multipleArgs.js", {
      removeFrontMatter: false,
      remarkOptions: {
        plugins: [RemarkFrontmatter],
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work with the 'settings' option", async () => {
    const compiler = getCompiler("multipleArgs.js", {
      remarkOptions: {
        settings: {
          bullet: "+",
          listItemIndent: "1",
        },
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work with the 'settings' option in plugins", async () => {
    const compiler = getCompiler("multipleArgs.js", {
      remarkOptions: {
        plugins: [
          {
            settings: {
              bullet: "+",
              listItemIndent: "1",
            },
          },
        ],
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should work with the 'data' option", async () => {
    let alpha;
    let charlie;

    function extractDataPlugin() {
      alpha = this.data("alpha");
      charlie = this.data("charlie");
    }

    const compiler = getCompiler("multipleArgs.js", {
      remarkOptions: {
        plugins: [extractDataPlugin],
        data: {
          alpha: "bravo",
          charlie: "delta",
        },
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode("main.bundle.js", compiler, stats);

    expect(alpha).toEqual("bravo");
    expect(charlie).toEqual("delta");
    expect(codeFromBundle.md).toMatchSnapshot("md");
    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should throw error #1", async () => {
    const RemarkFrontmatter = await require("remark-frontmatter");

    const compiler = getCompiler("multipleArgs.js", {
      removeFrontMatter: false,
      remarkOptions: {
        plugins: [[RemarkFrontmatter, { marker: "*" }]],
      },
    });

    const stats = await compile(compiler);

    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });

  it("should throw error #2", async () => {
    const errorGenerationPlugin = () => () => {
      throw new Error("Error");
    };

    const compiler = getCompiler("multipleArgs.js", {
      removeFrontMatter: false,
      remarkOptions: {
        plugins: [errorGenerationPlugin],
      },
    });

    const stats = await compile(compiler);

    expect(getErrors(stats)).toMatchSnapshot("errors");
    expect(getWarnings(stats)).toMatchSnapshot("warnings");
  });
});
