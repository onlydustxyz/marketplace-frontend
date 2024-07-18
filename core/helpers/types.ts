// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type GenericFunction = (...args: AnyType) => AnyType;

export type FirstParameter<T extends GenericFunction> = Parameters<T>[0];

export type Constructor<T = AnyType> = new (...args: AnyType[]) => T;
