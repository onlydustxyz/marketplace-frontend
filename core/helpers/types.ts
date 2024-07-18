// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type anyType = any;

export type GenericFunction = (...args: anyType) => anyType;

export type FirstParameter<T extends GenericFunction> = Parameters<T>[0];

export type Constructor<T = anyType> = new (...args: anyType[]) => T;
