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

function stringToKebab(str: string) {
  const words = str.split("");
  const kebabCaseWords = words.map((letter, idx) => {
    if (letter === letter.toUpperCase()) {
      return `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`;
    }
    return letter;
  });

  return kebabCaseWords.join("");
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

        export function ${PascalName}(props: T${PascalName}.Props) {
          return <div>${PascalName}</div>;
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

// TODO: Change the return if folder or path exist to not do it again
async function promptName() {
  const name = await i.input({ message: "Components Name" });
  const kebakName = stringToKebab(name);

  const folder = await i.input({ message: "Folder path" });

  const variants = await i.confirm({ message: "Add variant?" });

  const path = `${folder}/${kebakName}`;
  const isFolderExist = await exists(folder);

  if (!isFolderExist) {
    console.log(`${COLORS.YELLOW}Folder doesn't exist${COLORS.NC}`);
    return promptName();
  }

  const isPathExist = await exists(path);

  if (isPathExist) {
    console.log(`${COLORS.YELLOW}Path already exist${COLORS.NC}`);
    return promptName();
  }

  return { folder, name: kebakName, path, variants };
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
}

createComponents();
