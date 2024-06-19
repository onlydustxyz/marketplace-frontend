/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");
const { exec } = require("node:child_process");

async function createCoreComponent({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.core.tsx`,
    prettier.format(
      `
        import { ElementType } from "react";

        import { cn } from "src/utils/cn";

        import { T${PascalName}Props } from "./${name}.types";
        import { ${PascalName}CoreVariants } from "./${name}.variants";

        export function ${PascalName}Core<C extends ElementType = "div">({classNames, as, ...props}: T${PascalName}Props<C>) {
          const Component = as || "div";
          const { ...htmlProps } = props;
          const slots = ${PascalName}CoreVariants();

          return (
            <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createVariants({ name, path, PascalName }) {
  await fs.mkdir(`${path}/variants`);
  await fs.appendFile(
    `${path}/${name}.variants.ts`,
    prettier.format(
      `
        import { tv } from "tailwind-variants";

        export const ${PascalName}CoreVariants = tv({
          slots: {
            base: "group",
          },
          variants: {},
          defaultVariants: {},
        });
  `,
      { parser: "typescript" }
    )
  );
  await fs.appendFile(
    `${path}/variants/${name}-default.tsx`,
    prettier.format(
      `
        import { ElementType } from "react";

        import { T${PascalName}Props } from "../${name}.types";

        import { ${PascalName}Core } from "../${name}.core";

        export function ${PascalName}<C extends ElementType = "div">({ ...props }: T${PascalName}Props<C>) {
          return (
            <${PascalName}Core
              {...props}
              classNames={{}}
            />
          );
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
        import { ComponentPropsWithoutRef, ElementType } from "react";
        import { ${PascalName}CoreVariants } from "./${name}.variants";
        import { VariantProps } from "tailwind-variants";

        type Variants = VariantProps<typeof ${PascalName}CoreVariants>;
        type classNames = Partial<typeof ${PascalName}CoreVariants["slots"]>;

        export interface T${PascalName}Props<C extends ElementType> extends Variants {
          classNames?: classNames;
           htmlProps?: ComponentPropsWithoutRef<C>;
          as?: C;
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createLoading({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.loading.tsx`,
    prettier.format(
      `
        export function ${PascalName}Loading() {
          return <div />;
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createIndex({ name, path }) {
  await fs.appendFile(
    `${path}/index.ts`,
    prettier.format(
      `
        export * from "./${name}.core";
        export * from "./variants/${name}-default";
        export * from "./${name}.types";
        export * from "./${name}.loading";
        export * from "./${name}.variants"
  `,
      { parser: "typescript" }
    )
  );
}

async function createStories({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.stories.tsx`,
    prettier.format(
      `
        import { Meta, StoryObj } from "@storybook/react";
        import { T${PascalName}Props } from "./${name}.types";

        import { ${PascalName}Core } from "./${name}.core";
        import { ${PascalName} } from "./variants/${name}-default";

        type Story = StoryObj<typeof ${PascalName}Core>;

        const defaultProps: T${PascalName}Props<"div"> = {};

        const meta: Meta<typeof ${PascalName}Core> = {
          component: ${PascalName}Core,
          title: "${path.includes("atoms") ? "Atoms" : "Molecules"}/${PascalName}",
          tags: ["autodocs"],
          parameters: {
            backgrounds: {
              default: "black",
              values: [{ name: "black", value: "#1E1E1E" }],
            },
          },
        };

        export const Default: Story = {
          parameters: {
            docs: {
              source: { code: "<${PascalName} />" },
            },
          },
          render: args => {
            return (
              <div className="flex w-full items-center gap-2">
                <${PascalName} {...defaultProps} {...args} />
              </div>
            );
          },
        };

        export const Core: Story = {
          render: args => {
            return (
              <div className="flex w-full items-center gap-2">
                <${PascalName}Core {...defaultProps} {...args} />
              </div>
            );
          },
        };

        export default meta;

  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createCoreComponent(informations);
  await createVariants(informations);
  await createTypes(informations);
  await createLoading(informations);
  await createStories(informations);
  await createIndex(informations);
  await exec(`eslint '${informations.path}/*.{js,jsx,json,ts,tsx}' --max-warnings=0 --fix`);
}

async function promptName() {
  const { name, folder, path } = await defaultPromptName();

  /** variant default **/
  /** stories default **/

  return { folder, name, path };
}

async function createMainComponent() {
  const { folder, name, path } = await promptName();

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createMainComponent();
