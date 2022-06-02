import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("CJS", () => {
  it("should export loader", () => {
    const src = require("../dist/index.js").default;
    const cjs = require("../dist/cjs.js");

    expect(cjs).toEqual(src);
  });
});
