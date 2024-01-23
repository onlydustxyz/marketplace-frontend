/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs/promises");
const prettier = require("prettier");
const i = require("@inquirer/prompts");

interface Informations {
  folder: string;
  name: string;
  path: string;
  PascalName: string;
  camelName: string;
  options: {
    variants: boolean;
  };
}

const COLORS = {
  RED: "\x1b[0;31m",
  GREEN: "\x1b[0;32m",
  YELLOW: "\x1b[1;33m",
  BLUE: "\x1b[0;34m",
  NC: "\x1b[0m", // No color
};

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

async function createComponent({ name, path, PascalName }: Informations) {
  await fs.appendFile(
    `${path}/${name}.tsx`,
    prettier.format(
      `
        import { T${PascalName} } from "./${name}.types.ts";

        export function ${PascalName}({ children }: T${PascalName}.Props) {
          return <div>{children}</div>;
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createTypes({ name, path, PascalName, camelName, options: { variants } }: Informations) {
  await fs.appendFile(
    `${path}/${name}.types.ts`,
    prettier.format(
      `
        import { PropsWithChildren } from "react";
        ${
          variants
            ? `
        import { VariantProps } from "tailwind-variants"; 
        import { ${camelName}Variants } from "./${name}.variants";`
            : ""
        }

        export namespace T${PascalName} {
          ${variants ? `export type Variants = VariantProps<typeof ${camelName}Variants>;` : ""}

          export interface Props extends PropsWithChildren${variants ? ", Variants" : ""} {}
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createVariants({ name, path, camelName }: Informations) {
  await fs.appendFile(
    `${path}/${name}.variants.ts`,
    prettier.format(
      `
        import { tv } from "tailwind-variants";

        export const ${camelName}Variants = tv({
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
  await createComponent(informations);
  await createTypes(informations);

  if (informations.options.variants) {
    await createVariants(informations);
  }
}

async function askForFolder() {
  let folder = await i.input({ message: "Folder path:" });
  let isFolderExist = await exists(folder);

  while (!isFolderExist) {
    isFolderExist = await exists(folder);

    if (!isFolderExist) {
      console.log(`\n${COLORS.RED}❌ Folder doesn't exist${COLORS.NC}\n`);
      folder = await i.input({ message: "Folder path:" });
    }
  }

  return folder;
}

async function promptName() {
  const name = await i.input({ message: "Component name (kebab-case):" });

  const folder = await askForFolder();

  const path = `${folder}/${name}`;
  const isPathExist = await exists(path);

  if (isPathExist) {
    console.log(`${COLORS.RED}❌ Component already exist${COLORS.NC}`);
    console.log(`\nComponent path: ${COLORS.BLUE}${path}${COLORS.NC}`);

    console.log(`\n${COLORS.YELLOW}👇 Choose another name${COLORS.NC}\n`);

    return promptName();
  }

  const variants = await i.confirm({ message: "Do you want variants?" });

  return { folder, name, path, variants };
}

async function createComponents() {
  const { folder, name, path, variants } = await promptName();

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    options: { variants },
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createComponents();
