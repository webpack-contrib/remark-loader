function testLoader(content) {
  const result = { md: content };

  return `export default ${JSON.stringify(result)}`;
}

module.exports = testLoader;
