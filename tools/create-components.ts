const fs = require("fs/promises");
const prettier = require("prettier");
const i = require("@inquirer/prompts");
// @ts-ignore
// import * as prettier from "prettier";

const readline = require("readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

type Informations = {
  folder: string;
  name: string;
  path: string;
  PascalName: string;
  camelName: string;
  options: {
    variant: boolean;
    loading: boolean;
  };
};

// function capitalizeFirstLetter(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
//
function kebabToPascal(str: string) {
  const words = str.split("-");
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return pascalCaseWords.join("");
}

function kebabToCamel(str: string) {
  const words = str.split("-");
  const pascalCaseWords = words.map(word => word.charAt(0).toLowerCase() + word.slice(1));
  return pascalCaseWords.join("");
}

async function exists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}

// components/features

async function createIndex({ name, path, PascalName }: Informations) {
  await fs.appendFile(
    `${path}/index.ts`,
    prettier.format(
      `
    export * from "./${name}.tsx";

    import ${PascalName} from "./${name}.tsx";

    export * from "./${name}.tsx";
    export type * from "./${name}.type.ts";

    export default ${PascalName};
  `,
      { parser: "typescript" }
    )
  );
}

async function createComponent({ name, path, PascalName }: Informations) {
  await fs.appendFile(
    `${path}/${name}.tsx`,
    prettier.format(
      `
        import { ${PascalName}Props } from "./${name}.type.ts";

        export function ${PascalName}(props: ${PascalName}Props) {
          return <div>${PascalName}</div>;
        }

        export default ${PascalName};
  `,
      { parser: "typescript" }
    )
  );
}

async function createProps({ name, path, PascalName, options: { variant } }: Informations) {
  await fs.appendFile(
    `${path}/${name}.type.ts`,
    prettier.format(
      `
        import { PropsWithChildren } from "react";
        ${variant ? `import { ${PascalName}Variant } from "./${name}.variant.ts"` : ""};

        export interface ${PascalName}Props extends PropsWithChildren${variant ? `, ${PascalName}Variant` : ""} {
          sample?: string;
        }


  `,
      { parser: "typescript" }
    )
  );
}

async function createVariant({ name, path, PascalName, camelName }: Informations) {
  await fs.appendFile(
    `${path}/${name}.variant.ts`,
    prettier.format(
      `
        import { tv, VariantProps } from "tailwind-variants";

        export type ${PascalName}Variant = VariantProps<typeof ${camelName}Variant>;

        export const ${camelName}Variant = tv({
          base: "",
          variants: {},
          defaultVariants: {},
        });

  `,
      { parser: "typescript" }
    )
  );
}
async function createFiles(informations: Informations) {
  await createIndex(informations);
  await createComponent(informations);
  await createProps(informations);
  if (informations.options.variant) {
    await createVariant(informations);
  }
}

async function promptName() {
  const name = await i.input({ message: "Components Name" });
  const folder = await i.input({ message: "Folder path" });
  const variant = await i.confirm({ message: "Add variant?" });
  const path = `${folder}/${name}`;
  const isExist = await exists(path);

  if (isExist) {
    console.log("Already exist");
    return promptName();
  }

  return { folder, name, path, loading: false, variant: variant as boolean };
}

async function createComponents() {
  const { folder, name, path, loading, variant } = await promptName();
  await fs.mkdir(path);
  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    options: { loading, variant },
  });

  console.log("folder", folder, "name", name, "path", path);
  readline.close();
}

createComponents();
