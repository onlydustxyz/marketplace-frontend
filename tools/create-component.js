/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");
const prettier = require("prettier");
const { COLORS, kebabToPascal, kebabToCamel, defaultPromptName } = require("./global");

async function createComponent({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.tsx`,
    prettier.format(
      `
        import { T${PascalName} } from "./${name}.types";

        export function ${PascalName}({ children }: T${PascalName}.Props) {
          return <div>{children}</div>;
        }
  `,
      { parser: "typescript" }
    )
  );
}

async function createTypes({ name, path, PascalName, camelName, options: { variants } }) {
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

async function createVariants({ name, path, camelName }) {
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

async function createStories({ name, path, PascalName }) {
  await fs.appendFile(
    `${path}/${name}.stories.tsx`,
    prettier.format(
      `
        import type { Meta, StoryObj } from "@storybook/react";

        import { ${PascalName} } from "./${name}";
        import { T${PascalName} } from "./${name}.types";

        type Story = StoryObj<typeof ${PascalName}>;

        const defaultProps: T${PascalName}.Props = {
          children: <div>${PascalName}</div>
        };

        const meta: Meta<typeof ${PascalName}> = {
          component: ${PascalName},
          title: "Local components/${PascalName}",
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
            return <${PascalName} {...defaultProps} {...args} />;
          },
        };

        export default meta;
  `,
      { parser: "typescript" }
    )
  );
}

async function createFiles(informations) {
  await createComponent(informations);
  await createTypes(informations);

  if (informations.options.variants) {
    await createVariants(informations);
  }

  if (informations.options.stories) {
    await createStories(informations);
  }
}

async function promptName() {
  const { name, folder, path } = await defaultPromptName();

  const variants = await i.confirm({ message: "Do you want variants?" });
  const stories = await i.confirm({ message: "Do you want stories?" });

  return { folder, name, path, variants, stories };
}

async function createMainComponent() {
  const { folder, name, path, variants, stories } = await promptName();

  await fs.mkdir(path);

  await createFiles({
    folder,
    name,
    path,
    PascalName: kebabToPascal(name),
    camelName: kebabToCamel(name),
    options: { variants, stories },
  });

  console.log(`\n${COLORS.GREEN}✅ Component created${COLORS.NC}`);
  console.log(`Component path: ${COLORS.BLUE}${path}${COLORS.NC}\n`);
}

createMainComponent();
