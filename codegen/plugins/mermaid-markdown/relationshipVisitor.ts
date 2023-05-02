import { DocumentNode, TypeNode } from "graphql";
import { Kind, NamedTypeNode, ObjectTypeDefinitionNode } from "graphql";
import { filter, find } from "lodash";

export default function relationshipVisitor(ast: DocumentNode) {
  const objectTypes = filter(ast.definitions, { kind: Kind.OBJECT_TYPE_DEFINITION }) as ObjectTypeDefinitionNode[];
  const getObjectType = (type: NamedTypeNode) => find(objectTypes, ot => ot.name.value === type.name.value);

  const relationship = (from: string, type: TypeNode, relationshipType?: "one" | "many") => {
    if (type.kind === Kind.LIST_TYPE) {
      return relationship(from, type.type, "many");
    }

    if (type.kind === Kind.NON_NULL_TYPE) {
      return relationship(from, type.type, relationshipType);
    }

    if (type.kind === Kind.NAMED_TYPE && !type.name.value.endsWith("Aggregate")) {
      const relatedObjectType = getObjectType(type);
      if (relatedObjectType) {
        const arrow = relationshipType === "many" ? "--*" : "--";
        return `${from} ${arrow} ${relatedObjectType.name.value}`;
      }
    }

    return null;
  };

  const visitor = {
    ObjectTypeDefinition({ name, fields }: ObjectTypeDefinitionNode) {
      if (
        name.value.endsWith("Fields") ||
        name.value.endsWith("Aggregate") ||
        name.value.endsWith("Response") ||
        name.value.endsWith("_root")
      )
        return null;

      return fields?.map(({ type }) => relationship(name.value, type));
    },
  };

  return visitor;
}
