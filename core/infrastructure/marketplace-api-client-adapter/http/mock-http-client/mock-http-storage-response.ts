import { FirstParameter, GenericFunction } from "core/helpers/types";

export const mockHttpStorageResponse = <O extends GenericFunction>() => {
  return {
    request: () => Promise.resolve({}),
    tag: "",
  } as ReturnType<O>;
};

export const mockHttpStorageResponseWithParams = <O extends GenericFunction>(_: FirstParameter<O>) => {
  return {
    request: () => Promise.resolve({}),
    tag: "",
  } as ReturnType<O>;
};
