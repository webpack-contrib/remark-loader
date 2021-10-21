// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import src from "../src/index.js";
import cjs from "../src/cjs.js";

describe("CJS", () => {
  it("should export loader", () => {
    expect(cjs).toEqual(src);
  });
});
