import { readFileSync, writeFileSync } from "fs";
import { OpenAI, PromptTemplate } from "langchain";
import { size } from "./file.ts";

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

export const decorateFiles = async (paths: string[]) => {
  const requests = [];
  let sentTokens = 0;
  let startTime = Date.now();

  const MAX_TOKENS_PER_MIN = 85000;

  for (const [index, path] of paths.entries()) {
    const fileTokens = tokens(path);
    if (sentTokens + fileTokens > MAX_TOKENS_PER_MIN) {
      const elapsedTime = Date.now() - startTime;
      const waitTime = Math.max(0, 60000 - elapsedTime); // Wait until the minute is over
      await sleep(waitTime);
      sentTokens = 0;
      startTime = Date.now();
    }

    requests.push(decorateFile(path));
    sentTokens += fileTokens;
  }

  await Promise.all(requests);
};

const tokens = (path: string) => size(path) / 4;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
