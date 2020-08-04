import path from 'path';

import RemarkHTML from 'remark-html';

import {
  compile,
  getExecutedCode,
  getCompiler,
  getErrors,
  getWarnings,
} from './helpers';

describe('loader', () => {
  it('should work markdown -> markdown', async () => {
    const compiler = getCompiler('simple.js', {
      // eslint-disable-next-line global-require
      plugins: [require('remark-kbd')],
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work markdown -> html', async () => {
    const compiler = getCompiler(
      'simple.js',
      {},
      {
        module: {
          rules: [
            {
              test: /\.md$/i,
              rules: [
                {
                  loader: require.resolve('./helpers/testLoader'),
                },
                {
                  loader: 'html-loader',
                },
                {
                  loader: path.resolve(__dirname, '../src'),
                  options: {
                    // eslint-disable-next-line global-require
                    plugins: [require('remark-kbd'), RemarkHTML],
                  },
                },
              ],
            },
          ],
        },
      }
    );
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});
