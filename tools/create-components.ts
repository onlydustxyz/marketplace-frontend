import fs from "fs/promises";

const readline = require("readline/promises").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// function capitalizeFirstLetter(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
//
// function kebabToPascal(str: string) {
//   const words = str.split("-");
//   const pascalCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
//   return pascalCaseWords.join("");
// }

async function exists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch {
    return false;
  }
}

async function createIndex(name: string, folder: string, path: string) {
  const createIndex = await fs.appendFile(`${path}/index.ts`, "coucou");
}
async function createFiles(name: string, folder: string, path: string) {}

async function promptName() {
  const name = await readline.question("\x1b[34m Components Name ? ");
  const folder = await readline.question("\x1b[34m Folder path ? ");
  const path = `${folder}/${name}`;
  const isExist = await exists(path);

  if (isExist) {
    console.log("Already exist");
    return promptName();
  }

  return { folder, name, path };
}

async function createComponents() {
  const { folder, name, path } = await promptName();
  await createFiles(folder, name, path);

  console.log("folder", folder, "name", name, "path", path);
  readline.close();
}

createComponents();
