/* eslint-disable @typescript-eslint/no-var-requires */

const i = require("@inquirer/prompts");
const fs = require("fs/promises");

const COLORS = {
  RED: "\x1b[0;31m",
  GREEN: "\x1b[0;32m",
  YELLOW: "\x1b[1;33m",
  BLUE: "\x1b[0;34m",
  NC: "\x1b[0m", // No color
};

function kebabToPascal(str) {
  const words = str.split("-");
  const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  return pascalCaseWords.join("");
}

function kebabToCamel(str) {
  const words = str.split("-");
  const pascalCaseWords = words.map((word, index) =>
    index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  return pascalCaseWords.join("");
}

async function exists(path) {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
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

async function defaultPromptName() {
  const name = await i.input({ message: "Component name (kebab-case):" });

  const folder = await askForFolder();

  const path = `${folder}/${name}`;
  const isPathExist = await exists(path);

  if (isPathExist) {
    console.log(`${COLORS.RED}❌ Component already exist${COLORS.NC}`);
    console.log(`\nComponent path: ${COLORS.BLUE}${path}${COLORS.NC}`);

    console.log(`\n${COLORS.YELLOW}👇 Choose another name${COLORS.NC}\n`);

    return defaultPromptName();
  }

  return { folder, name, path };
}

module.exports = {
  COLORS,
  kebabToPascal,
  kebabToCamel,
  defaultPromptName,
  exists,
};
