// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericFunction = (...args: any) => any;

export type FirstParameter<T extends GenericFunction> = Parameters<T>[0];
