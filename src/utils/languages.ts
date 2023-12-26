export const buildLanguageString = (languages: string[]) => {
  return languages.map(str => str.toLowerCase()).join(", ");
};
