import { defineDocumentType, makeSource } from "contentlayer/source-files";

import { createRequire } from "module";
import { remarkCodeHike } from "@code-hike/mdx";

const require = createRequire(import.meta.url);
const theme = require("shiki/themes/dark-plus.json");

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    mainImage: {
      type: "string",
      required: true,
    },
    categories: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    createdAt: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/post/${doc._raw.flattenedPath}`,
    },
  },
}));
export default makeSource({
  contentDirPath: "src/posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [[remarkCodeHike, { theme, showCopyButton: true }]],
  },
});
