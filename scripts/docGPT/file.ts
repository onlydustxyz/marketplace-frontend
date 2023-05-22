import { statSync } from "fs";

export const isRust = (path: string) => /\.(rs)$/.test(path);

export const isLargerThan = (min: number) => (path: string) => size(path) > min;

export const size = (path: string) => statSync(path).size;
