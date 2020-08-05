import { getOptions } from 'loader-utils';

import validateOptions from 'schema-utils';
import FrontMatter from 'front-matter';
import Remark from 'remark';
import Report from 'vfile-reporter';

import schema from './options.json';

export default function loader(content) {
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Remark Loader',
    baseDataPath: 'options',
  });

  const callback = this.async();

  const { plugins = [] } = options;
  const parsed = FrontMatter(content);

  const remark = Remark();

  for (const item of plugins) {
    if (Array.isArray(item)) {
      const [plugin, pluginOptions] = item;

      remark.use(plugin, pluginOptions);
    } else {
      remark.use(item);
    }
  }

  remark.process(parsed.body, (err, file) => {
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
