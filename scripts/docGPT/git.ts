import git from "isomorphic-git";
import fs from "fs";
import path from "path";

export const list = (root: string) =>
  git.listFiles({ fs, dir: root }).then(files => files.map(file => path.join(root, file)));
