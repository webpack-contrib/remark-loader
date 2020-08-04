import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import parse from './parse';
import schema from './options.json';

/**
 * Primary loader function
 *
 * @param {string} content - Markdown file content
 */
export default function loader(content) {
  const callback = this.async();
  const options = getOptions(this);

  validateOptions(schema, options, {
    name: 'Remark Loader',
    baseDataPath: 'options',
  });

  parse(content, options)
    // @todo we should probably just intercept images in the tree
    // or recommend that the `html-loader` be chained
    .then((resolved) => callback(null, resolved.content))
    .catch(callback);
}
