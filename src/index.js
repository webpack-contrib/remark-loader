import { getOptions } from 'loader-utils';

import validateOptions from 'schema-utils';
import FrontMatter from 'front-matter';
import Remark from 'remark';
import Report from 'vfile-reporter';

import schema from './options.json';

export default function loader(markdown) {
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Remark Loader',
    baseDataPath: 'options',
  });

  const callback = this.async();

  const { plugins = [] } = options;
  const parsed = FrontMatter(markdown);

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
        callback(Report(err || file));

        return;
      }

      callback(null, result.content);
    });
}
