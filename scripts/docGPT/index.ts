import * as dotenv from "dotenv";
import { decorate } from "./gpt.ts";
import { readFile, writeFile } from "fs/promises";

dotenv.config();

const FILE = "../../backend/event-listeners/src/bin/github-indexer/indexer/user.rs";

readFile(FILE)
  .then(code => decorate(code.toString()))
  .then(code => writeFile(FILE, code));
