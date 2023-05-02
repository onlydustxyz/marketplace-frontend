import {
  FieldDefinitionNode,
  ListTypeNode,
  NamedTypeNode,
  NonNullTypeNode,
  ObjectTypeDefinitionNode,
  visit,
} from "graphql";
import { isString } from "lodash";

const visitor = {
  NamedType(node: NamedTypeNode) {
    return node.name.value;
  },

  ListType(node: ListTypeNode) {
    return `[${visit(node.type, visitor)}]`;
  },

  NonNullType(node: NonNullTypeNode) {
    return `${visit(node.type, visitor)}!`;
  },

  FieldDefinition({ name, type }: FieldDefinitionNode) {
    if (name.value.endsWith("Aggregate")) return null;

    return `   ${name.value}: ${visit(type, visitor)}`;
  },

  ObjectTypeDefinition({ name, fields }: ObjectTypeDefinitionNode) {
    if (
      name.value.endsWith("Fields") ||
      name.value.endsWith("Aggregate") ||
      name.value.endsWith("Response") ||
      name.value.endsWith("_root")
    )
      return null;

    return `class ${name.value} {
${fields
  ?.map(node => visit(node, visitor))
  .filter(isString)
  .join("\n")}
}`;
  },
};

export default visitor;
