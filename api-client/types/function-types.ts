// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionTypes<T extends (...args: any) => any> = Parameters<T>[0];
