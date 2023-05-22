import * as dotenv from "dotenv";
import { decorateFiles } from "./gpt.ts";
import { list } from "./git.ts";
import { isLargerThan, isRust } from "./file.ts";

dotenv.config();

list("../..")
  .then(files => files.filter(isRust).filter(isLargerThan(512)))
  .then(decorateFiles);
