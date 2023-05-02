const getHasuraUrl = () => process.env.HASURA_URL ?? "http://localhost:8080/v1/graphql";
const getHasuraSecretKey = () => process.env.HASURA_SECRET_KEY ?? "myadminsecretkey";

module.exports = {
  schema: {
    [getHasuraUrl()]: {
      headers: { "X-Hasura-Admin-Secret": getHasuraSecretKey() },
    },
  },
  documents: ["./frontend/src/**/*.tsx", "./frontend/src/**/*.ts", "./frontend/src/**/*.graphql"],
  overwrite: true,
  generates: {
    "./frontend/src/__generated/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: {
        avoidOptionals: true,
        skipTypename: false,
      },
    },
    "./frontend/src/__generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
    "./backend/common/infrastructure/src/graphql/__generated/graphql.schema.json": {
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
      plugins: {
        "codegen/plugins/mermaid-markdown": {
          entryTypes: ["Projects"],
        },
      },
    },
  },
};
