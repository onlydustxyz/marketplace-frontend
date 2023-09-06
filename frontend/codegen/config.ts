import { CodegenConfig } from "@graphql-codegen/cli";

const getHasuraUrl = () => process.env.HASURA_URL ?? "http://localhost:8080/v1/graphql";
const getHasuraSecretKey = () => process.env.HASURA_SECRET_KEY ?? "myadminsecretkey";

const config: CodegenConfig = {
  schema: [
    {
      [getHasuraUrl()]: {
        headers: { "X-Hasura-Admin-Secret": getHasuraSecretKey() },
      },
    },
    "./codegen/local_schema.graphql",
  ],
  documents: ["./src/**/*.tsx", "./src/**/*.ts", "./src/**/*.graphql"],
  overwrite: true,
  generates: {
    "./src/__generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        avoidOptionals: true,
        skipTypename: false,
      },
    },
    "./src/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./playwright/__generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        avoidOptionals: true,
        skipTypename: false,
      },
      documents: ["./playwright/**/*.ts", "./playwright/**/*.graphql"],
    },
    "./doc/data_diagram.md": {
      plugins: [
        {
          "codegen/plugins/mermaid-markdown": {
            entryTypes: ["Projects"],
          },
        },
      ],
    },
  },
};

export default config;
