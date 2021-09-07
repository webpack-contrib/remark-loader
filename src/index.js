import schema from "./options.json";

export default async function loader(content) {
  const options = this.getOptions(schema);
  const callback = this.async();
  const remarkOptions =
    typeof options.remarkOptions !== "undefined" ? options.remarkOptions : {};
  const { remark } = await import("remark");
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

  let normalizedContent = content;

  if (removeFrontMatter) {
    const frontMatter = (await import("front-matter")).default;

    normalizedContent = frontMatter(content).body;
  }

  const Report = (await import("vfile-reporter")).default;

  try {
    processor.process(normalizedContent, (error, file) => {
      if (error) {
        callback(Report(error));

        return;
      }

      callback(null, file.value);
    });
  } catch (error) {
    callback(error);
  }
}
