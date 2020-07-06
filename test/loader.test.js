/* global describe, expect, it */
const { getCompiler, compile } = require('./compiler')
const execute = require('./execute')

describe("remark-loader", () => {
  it("handles a basic file with attributes", async () => {
    const compiler = getCompiler("./fixtures/basic.js")
    const stats = await compile(compiler)
    const result = execute('bundle.js', compiler, stats)

    expect(result).toMatchSnapshot()
    expect(result.attributes).toEqual({ title: "my good post" })
  })

  it("handles a file with complex attributes", async () => {
    const compiler = getCompiler("./fixtures/complex-attributes.js")
    const stats = await compile(compiler)
    const result = execute('bundle.js', compiler, stats)

    expect(result).toMatchSnapshot()
  })

  it("handles a file without frontmatter", async () => {
    const compiler = getCompiler("./fixtures/no-frontmatter.js")
    const stats = await compile(compiler)
    const result = execute('bundle.js', compiler, stats)

    expect(result.attributes).toEqual({})
    expect(result.default).toMatchSnapshot()
  })

  it("handles an empty file", async () => {
    const compiler = getCompiler("./fixtures/empty.js")
    const stats = await compile(compiler)
    const result = execute('bundle.js', compiler, stats)

    expect(result.attributes).toEqual({})
    expect(result.default.trim()).toEqual('')
  })
})