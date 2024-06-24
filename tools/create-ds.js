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
        import { PropsWithAdapter } from "components/types/props-with-adapter";

        import { cn } from "src/utils/cn";

        import { ${PascalName}Port } from "./${name}.types";
        import { ${PascalName}CoreVariants } from "./${name}.variants";

        export function ${PascalName}Core<C extends ElementType = "div">({Adapter, ...props}: PropsWithAdapter<${PascalName}Port<C>>) {

          return (
            <Adapter {...props} />
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

        import { ${PascalName}DefaultAdapter} from "../adapters/default/default.adapter";
        import { ${PascalName}Core } from "../${name}.core";
        import { ${PascalName}Port } from "../${name}.types";

        export function ${PascalName}<C extends ElementType = "div">({ ...props }: ${PascalName}Port<C>) {
          return (
            <${PascalName}Core
              Adapter={${PascalName}DefaultAdapter}
              {...props}
            />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
}

async function createAdapter({ name, path, PascalName }) {
  await fs.mkdir(`${path}/adapters`);
  await fs.mkdir(`${path}/adapters/default`);
  await fs.appendFile(
    `${path}/adapters/default/default.adapter.tsx`,
    prettier.format(
      `
        import { ElementType } from "react";

        import { cn } from "src/utils/cn";

        import { ${PascalName}Port } from "../../${name}.types";
        import { ${PascalName}DefaultVariants } from "./default.variants";

        export function ${PascalName}DefaultAdapter<C extends ElementType = "div">({classNames, as, ...props}: ${PascalName}Port<C>) {
          const Component = as || "div";
          const { ...htmlProps } = props;
          const slots = ${PascalName}DefaultVariants();

          return (
            <Component {...htmlProps} className={cn(slots.base(), classNames?.base)} />
          );
        };
  `,
      { parser: "typescript" }
    )
  );
  await fs.appendFile(
    `${path}/adapters/default/default.variants.ts`,
    prettier.format(
      `
        import { tv } from "tailwind-variants";
        import { ${PascalName}CoreVariants } from "../../${name}.variants";

        export const ${PascalName}DefaultVariants = tv({
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

        export interface ${PascalName}Port<C extends ElementType> extends Variants {
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
        export * from "./${name}.variants";
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
        import { ${PascalName}Port } from "./${name}.types";

        import { ${PascalName} } from "./variants/${name}-default";

        type Story = StoryObj<typeof ${PascalName}>;

        const defaultPort: ${PascalName}Port<"div"> = {};

        const meta: Meta<typeof ${PascalName}> = {
          component: ${PascalName},
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
                <${PascalName} {...defaultPort} {...args} />
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
  await createAdapter(informations);
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
