import frontMatter from "front-matter";

import schema from "./options.json";

export default async function loader(content) {
  const options = this.getOptions(schema);
  const remarkOptions =
    typeof options.remarkOptions !== "undefined" ? options.remarkOptions : {};
  const callback = this.async();

  let remark;

  try {
    ({ remark } = await import("remark"));
  } catch (error) {
    callback(error);

    return;
  }

  const processor = remark();

  if (typeof remarkOptions.plugins !== "undefined") {
    for (const item of remarkOptions.plugins) {
      if (Array.isArray(item)) {
        const [plugin, pluginOptions] = item;

        processor.use(plugin, pluginOptions);
      } else {
        processor.use(item);
      }
    }
  }

  if (typeof remarkOptions.settings !== "undefined") {
    processor.use({ settings: remarkOptions.settings });
  }

  if (typeof remarkOptions.data !== "undefined") {
    processor.data(remarkOptions.data);
  }

  const removeFrontMatter =
    typeof options.removeFrontMatter !== "undefined"
      ? options.removeFrontMatter
      : true;

  let file;

  try {
    file = await processor.process(
      removeFrontMatter ? frontMatter(content).body : content
    );
  } catch (error) {
    const Report = (await import("vfile-reporter")).default;

    callback(Report(error));

    return;
  }

  callback(null, String(file));
}
