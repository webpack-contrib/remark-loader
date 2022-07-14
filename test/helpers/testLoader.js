function testLoader(content) {
  const result = { md: content };

  return `module.exports = ${JSON.stringify(result)}`;
}

module.exports = testLoader;
