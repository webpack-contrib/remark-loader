import FrontMatter from 'front-matter';
import Remark from 'remark';
import Report from 'vfile-reporter';

/**
 * Parse markdown and return the body and imports
 *
 * @param   {string} markdown - Markdown string to be parsed
 * @param   {object} options  - Options passed to the loader
 * @returns {object}          - HTML and imports
 */
export default function parse(markdown, options) {
  const { plugins = [] } = options || {};
  const parsed = FrontMatter(markdown);

  return new Promise((resolve, reject) => {
    plugins
      .reduce((remark, item) => {
        if (Array.isArray(item)) {
          return remark.use.apply(null, item);
        }

        return remark.use(item);
      }, Remark())
      .process(parsed.body, (err, file) => {
        const result = {
          content: file.contents,
          attributes: parsed.attributes,
        };

        if (err) {
          reject(Report(err || file));
        } else resolve(result);
      });
  });
}
