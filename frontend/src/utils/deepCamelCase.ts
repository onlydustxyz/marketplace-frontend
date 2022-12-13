import isArray from "lodash/isArray";
import camelCase from "lodash/camelCase";
import isPlainObject from "lodash/isPlainObject";

export const deepCamelCase = (value: any): any => {
  if (isArray(value)) return value.map(deepCamelCase);
  if (!isPlainObject(value)) return value;
  const dict = value as Record<string, unknown>;
  const camelDict: Record<string, unknown> = {};
  Object.keys(dict).forEach(key => {
    const newValue = dict[key];
    camelDict[camelCase(key)] = deepCamelCase(newValue);
  });

  return camelDict;
};
