import { PluginFunction, getCachedDocumentNodeFromSchema } from "@graphql-codegen/plugin-helpers";
import { visit } from "graphql";
import { chain, isString } from "lodash";
import typeVisitor from "./typeVisitor";
import relationshipVisitor from "./relationshipVisitor";

export const plugin: PluginFunction = async schema => {
  const ast = getCachedDocumentNodeFromSchema(schema);

  const types = visit(ast, typeVisitor).definitions.filter(isString).join("\n\n");
  const relationships = chain(visit(ast, relationshipVisitor(ast)).definitions.flat())
    .filter(isString)
    .sort()
    .uniq()
    .join("\n")
    .value();

  return `# Data diagram

\`\`\`mermaid
classDiagram

${types}

${relationships}
\`\`\`
`;
};
