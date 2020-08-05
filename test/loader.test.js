import path from 'path';

import RemarkHTML from 'remark-html';
import RemarkKbd from 'remark-kbd';
import RemarkBookmarks from 'remark-bookmarks';

import {
  compile,
  getExecutedCode,
  getCompiler,
  getErrors,
  getWarnings,
} from './helpers';

describe('loader', () => {
  it('should work markdown to markdown', async () => {
    const compiler = getCompiler('simple.js', {
      plugins: [RemarkKbd],
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work markdown to html', async () => {
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
                    plugins: [RemarkKbd, RemarkHTML],
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

  it('should work when if remark plugin is array', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      plugins: [
        RemarkKbd,
        [
          RemarkBookmarks,
          {
            bookmarks: {
              npm: 'https://npmjs.com/package/remark-bookmarks',
            },
          },
        ],
      ],
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});
