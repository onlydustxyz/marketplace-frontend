export const REGEX = {
  website: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  telegram: /^(?:@|(?:(?:(?:https?:\/\/)?t(?:elegram)?)\.me\/))?(\w*)$/,
  whatsapp: /^\+?(?:[0-9-(). ])*$/,
  twitter: /^(?:@|(?:(?:(?:https?:\/\/)?(?:twitter\.com|x\.com)\/))?)(\w*)$/,
  discord: /^@?[a-zA-Z0-9_.]*$/,
  linkedin: /^(?:@|(?:(?:(?:https?:)?\/\/)?(?:[\w]+\.)?linkedin\.com\/in\/))?([\w\-_À-ÿ%]*)\/?$/,
};
