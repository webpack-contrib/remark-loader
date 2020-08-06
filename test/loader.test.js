import path from 'path';

import RemarkHTML from 'remark-html';
import RemarkBookmarks from 'remark-bookmarks';
import RemarkFrontmatter from 'remark-frontmatter';

import {
  compile,
  getExecutedCode,
  getCompiler,
  getErrors,
  getWarnings,
} from './helpers';

describe('loader', () => {
  it('should work markdown to markdown', async () => {
    const compiler = getCompiler('simple.js');
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
                    plugins: [RemarkHTML],
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

  it('should work if remark plugin is array', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      plugins: [
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

  it('should not remove frontmatter', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      removeFrontMatter: false,
      plugins: [RemarkFrontmatter],
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work settings option', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      settings: {
        bullet: '+',
        listItemIndent: '1',
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work settings option in plugins', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      plugins: [
        {
          settings: {
            bullet: '+',
            listItemIndent: '1',
          },
        },
      ],
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work data option', async () => {
    let alpha;
    let charlie;

    function extractDataPlugin() {
      alpha = this.data('alpha');
      charlie = this.data('charlie');
    }

    const compiler = getCompiler('multipleArgs.js', {
      plugins: [extractDataPlugin],
      data: {
        alpha: 'bravo',
        charlie: 'delta',
      },
    });
    const stats = await compile(compiler);
    const codeFromBundle = getExecutedCode('main.bundle.js', compiler, stats);

    expect(alpha).toEqual('bravo');
    expect(charlie).toEqual('delta');
    expect(codeFromBundle.md).toMatchSnapshot('md');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should throw error #1', async () => {
    const compiler = getCompiler('multipleArgs.js', {
      removeFrontMatter: false,
      plugins: [[RemarkFrontmatter, { marker: '*' }]],
    });

    const stats = await compile(compiler);

    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should throw error #2', async () => {
    const errorGenerationPlugin = () => () => {
      throw new Error('Error');
    };

    const compiler = getCompiler('multipleArgs.js', {
      removeFrontMatter: false,
      plugins: [errorGenerationPlugin],
    });

    const stats = await compile(compiler);

    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});
