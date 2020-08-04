import Utils from 'loader-utils';
import HTMLLoader from 'html-loader';

import parse from './parse';

/**
 * Primary loader function
 *
 * @param {string} content - Markdown file content
 */
export default function loader(content) {
  const callback = this.async();
  const options = Utils.getOptions(this);

  parse(content, options)
    // @todo we should probably just intercept images in the tree
    // or recommend that the `html-loader` be chained
    .then((processed) =>
      Object.assign({}, processed, {
        content: HTMLLoader(processed.content),
      })
    )
    .then((resolved) => callback(null, resolved.content))
    .catch(callback);
}
