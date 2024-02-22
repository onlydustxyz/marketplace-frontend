/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");

async function createComponent({ name, path, PascalName, camelName }) {
  await fs.appendFile(
    `${path}/${name}.tsx`,
    prettier.format(
      `
        import { T${PascalName} } from "./${name}.types";

        export const ${camelName} = (): T${PascalName}.Return => {
          return {};
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createTypes({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.types.ts`,
    prettier.format(
      `
        export namespace T${PascalName} {
          export interface Return {}
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createComponent(informations);
  await createTypes(informations);
}

async function promptName() {
  const { name, folder, path } = await defaultPromptName();

  return { folder, name, path };
}

async function createMainHook() {
  const { folder, name, path } = await promptName();

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
  });

  console.log(`\n${COLORS.GREEN}✅ Hook created${COLORS.NC}`);
  console.log(`Hook path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createMainHook();
