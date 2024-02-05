export const REGEX = {
  telegram: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
  whatsapp: /^\+?(?:[0-9-(). ])*$/,
  twitter: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter\.com|x\.com)\/))?)(\w*)$/,
  discord: /^@?[a-zA-Z0-9_.]*$/,
  linkedin: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]*)\/?$/,
};
