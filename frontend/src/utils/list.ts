export const formatList = (list: Iterable<string>, style: Intl.ListFormatStyle = "narrow") => {
  return new Intl.ListFormat("en-US", { style }).format(list);
};
