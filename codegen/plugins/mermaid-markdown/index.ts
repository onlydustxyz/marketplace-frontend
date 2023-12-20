import { PluginFunction, getCachedDocumentNodeFromSchema } from "@graphql-codegen/plugin-helpers";
import { visit } from "graphql";
import _ from "lodash";
import typeVisitor from "./typeVisitor";
import relationshipVisitor from "./relationshipVisitor";

export const plugin: PluginFunction = async schema => {
  const ast = getCachedDocumentNodeFromSchema(schema);

  const types = visit(ast, typeVisitor).definitions.filter(_.isString).join("\n\n");
  const relationships = _.chain(visit(ast, relationshipVisitor(ast)).definitions.flat())
    .filter(_.isString)
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
