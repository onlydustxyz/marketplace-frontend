/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");

async function createCoreComponent({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.core.tsx`,
    prettier.format(
      `
        import { cn } from "src/utils/cn";

        import { T${PascalName}Props } from "./${name}.types";
        import { ${PascalName}CoreVariants } from "./${name}.variants";

        export const ${PascalName}Core = ({classNames, className, as: Component = "div",  ...props}: T${PascalName}Props) => {
          const slots = ${PascalName}CoreVariants({ ...props });

          return (
            <Component {...props} className={cn(slots.wrapper(), className, classNames?.wrapper)} />
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
          base: "",
          slots: {
            wrapper: "",
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
        import { T${PascalName}Props } from "../${name}.types";

        import { ${PascalName}Core } from "../${name}.core";

        export const ${PascalName} = ({ ...props }: T${PascalName}Props) => {
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
        import { ElementType } from "react";
        import { ${PascalName}CoreVariants } from "./${name}.variants";
        import { VariantProps } from "tailwind-variants";
        import { AsProps } from "types/as-element";


        type Variants = VariantProps<typeof ${PascalName}CoreVariants>;
        type classNames = Partial<typeof ${PascalName}CoreVariants["slots"]>;

        export type T${PascalName}Props<T extends ElementType = "div"> = AsProps<T> & Variants & {
          classNames?: classNames;
          as?: T;
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
        export const ${PascalName}Loading = () => {
          return <div />;
        };
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
        import { T${PascalName}Core  } from "./${name}.types";

        import { ${PascalName}Core } from "./${name}.core";
        import { ${PascalName} } from "./variants/${name}-default";

        type Story = StoryObj<typeof ${PascalName}Core>;

        const defaultProps: T${PascalName}Core.Props = {};

        const meta: Meta<typeof ${PascalName}Core> = {
          component: ${PascalName}Core,
          title: "${path.includes("atoms") ? "Atoms" : "Molecules"}/${PascalName}",
          tags: ["autodocs"],
          parameters: {
            backgrounds: {
              default: "black",
              values: [{ name: "black", value: "#0E0814" }],
            },
          },
        };

        export const Default: Story = {
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
  // await createIndex(informations);
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
