import { readFileSync, writeFileSync } from "fs";
import { OpenAI, PromptTemplate } from "langchain";

const MODEL = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const PROMPT_TEMPLATE = new PromptTemplate({
  inputVariables: ["code"],
  template: "Decorate the following code with doc comments that are compatible with cargo docs command: {code}",
});

export const decorateCode = async (code: string) =>
  PROMPT_TEMPLATE.format({
    code,
  }).then(p => MODEL.call(p));

export const decorateFile = async (path: string) => {
  const code = readFileSync(path).toString();
  const decorated = await decorateCode(code);
  writeFileSync(path, decorated);
};

export const decorateFiles = (paths: string[]) => Promise.all(paths.map(decorateFile));
