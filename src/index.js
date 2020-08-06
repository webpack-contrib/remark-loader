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

  const removeFrontMatter =
    typeof options.removeFrontMatter !== 'undefined'
      ? options.removeFrontMatter
      : true;

  const parsed = removeFrontMatter ? FrontMatter(content) : { body: content };

  const remark = Remark();

  const { remarkOptions = {} } = options;

  const { plugins = [] } = remarkOptions;

  for (const item of plugins) {
    if (Array.isArray(item)) {
      const [plugin, pluginOptions] = item;

      remark.use(plugin, pluginOptions);
    } else {
      remark.use(item);
    }
  }

  const { settings, data } = remarkOptions;

  if (typeof settings !== 'undefined') {
    remark.use({ settings });
  }

  if (typeof data !== 'undefined') {
    remark.data(data);
  }

  try {
    remark.process(parsed.body, (err, file) => {
      if (err) {
        callback(Report(err));

        return;
      }

      const result = {
        content: file.contents,
        attributes: parsed.attributes,
      };

      callback(null, result.content);
    });
  } catch (error) {
    callback(error);
  }
}
