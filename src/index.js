import { getOptions } from 'loader-utils';

import validateOptions from 'schema-utils';
import frontMatter from 'front-matter';
import remark from 'remark';
import Report from 'vfile-reporter';

import schema from './options.json';

export default function loader(content) {
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Remark Loader',
    baseDataPath: 'options',
  });

  const remarkOptions =
    typeof options.remarkOptions !== 'undefined' ? options.remarkOptions : {};
  const processor = remark();

  if (typeof remarkOptions.plugins !== 'undefined') {
    for (const item of remarkOptions.plugins) {
      if (Array.isArray(item)) {
        const [plugin, pluginOptions] = item;

        processor.use(plugin, pluginOptions);
      } else {
        processor.use(item);
      }
    }
  }

  if (typeof remarkOptions.settings !== 'undefined') {
    processor.use({ settings: remarkOptions.settings });
  }

  if (typeof remarkOptions.data !== 'undefined') {
    processor.data(remarkOptions.data);
  }

  const removeFrontMatter =
    typeof options.removeFrontMatter !== 'undefined'
      ? options.removeFrontMatter
      : true;
  const callback = this.async();

  try {
    processor.process(
      removeFrontMatter ? frontMatter(content).body : content,
      (error, file) => {
        if (error) {
          callback(Report(error));

          return;
        }

        callback(null, file.contents);
      }
    );
  } catch (error) {
    callback(error);
  }
}
