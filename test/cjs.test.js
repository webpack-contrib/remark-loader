import src from "../src/index.js";
import cjs from "../src/cjs.js";

describe("CJS", () => {
  it("should export loader", () => {
    expect(cjs).toEqual(src.default);
  });
});
