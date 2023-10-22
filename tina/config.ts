import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.TINA_BRANCH ||
  process.env.CF_PAGES_BRANCH ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  clientId: process.env.TINA_CLIENT_ID,

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        fields: [
          {
            isTitle: true,
            label: "Title",
            name: "title",
            required: true,
            type: "string"
          },
          {
            label: "Description",
            name: "description",
            required: false,
            type: "string"
          },
          {
            isBody: true,
            label: "Body",
            name: "body",
            type: "rich-text"
          }
        ],
        format: "mdx",
        label: "Posts",
        name: "post",
        path: "content/posts"
      }
    ]
  },
  // search: {
  //   indexBatchSize: 100,
  //   maxSearchIndexFieldLength: 100,
  //   tina: {
  //     indexerToken: process.env.TINA_INDEXER_TOKEN,
  //     stopwordLanguages: ["en"]
  //   }
  // },
  token: process.env.TINA_TOKEN
});
