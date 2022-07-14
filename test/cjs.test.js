describe("CJS", () => {
  it("should export loader", () => {
    const src = require("../dist/index.js").default;
    const cjs = require("../dist/cjs.js");

    expect(cjs).toEqual(src);
  });
});
