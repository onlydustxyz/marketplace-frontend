/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName, exists } = require("./global");
const { exec } = require("node:child_process");

async function createAdapter({ name, path, PascalName, PascalAdapterName, camelAdapterName, adapterName }) {
  await fs.mkdir(`${path}/adapters/${camelAdapterName}`);
  await fs.appendFile(
    `${path}/adapters/${adapterName}/${adapterName}.adapter.tsx`,
    prettier.format(
      `
        import { ElementType } from "react";

        import { cn } from "src/utils/cn";

        import { ${PascalName}Port } from "../../${name}.types";
        import { ${PascalName}${PascalAdapterName}Variants } from "./${adapterName}.variants";

        export function ${PascalName}${PascalAdapterName}Adapter<C extends ElementType = "div">({classNames, as, ...props}: ${PascalName}Port<C>) {
          const Component = as || "div";
          const { ...htmlPort } = props;
          const slots = ${PascalName}${PascalAdapterName}Variants();

          return (
            <Component {...htmlPort} className={cn(slots.base(), classNames?.base)} />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
  await fs.appendFile(
    `${path}/adapters/${adapterName}/${adapterName}.variants.ts`,
    prettier.format(
      `
        import { tv } from "tailwind-variants";
        import { ${PascalName}CoreVariants } from "../../${name}.variants";

        export const ${PascalName}${PascalAdapterName}Variants = tv({
          extend: ${PascalName}CoreVariants,
          slots: {
            base: "",
          },
          variants: {},
          defaultVariants: {},
        });
  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  const isPathExist = await exists(`${informations.path}/adapters`);
  if (!isPathExist) {
    await fs.mkdir(`${informations.path}/adapters`);
  }
  await createAdapter(informations);
  await exec(`eslint '${informations.path}/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const { name, folder } = await defaultPromptName();

  /** variant default **/
  /** stories default **/

  return { folder, name, path: folder };
}

async function createMainComponent() {
  const { folder, name: adapterName, path } = await promptName();
  const name = [...path.split("/")].pop();

  await createFiles({
    folder,
    name,
    path,
    adapterName,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    PascalAdapterName: kebabToPascal(adapterName),
    camelAdapterName: kebabToCamel(adapterName),
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createMainComponent();
