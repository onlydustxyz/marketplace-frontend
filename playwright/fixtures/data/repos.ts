import { Repo } from "../../types";

export const repos: Record<string, Repo> = {
  A: {
    id: 602953043,
    name: "cool-repo-A",
    owner: "od-mocks",
    languages: {
      Rust: 512,
    },
  },
  B: {
    id: 602953640,
    name: "cool.repo.B",
    owner: "od-mocks",
    languages: {
      HTML: 158,
    },
  },
  noReadme: {
    id: 584840242,
    name: "no-readme",
    owner: "od-mocks",
    languages: {},
  },
  empty: {
    id: 584839416,
    name: "empty",
    owner: "od-mocks",
    languages: {},
  },
  unexisting: {
    id: 2147466666,
    name: "",
    owner: "",
    languages: {},
  },
  kakarot: {
    id: 629516515,
    name: "kakarot",
    owner: "od-mocks",
    languages: {
      Cairo: 769329,
      Python: 261120,
      Solidity: 49001,
      Shell: 15765,
      Makefile: 3506,
      Dockerfile: 1607,
    },
  },
};
