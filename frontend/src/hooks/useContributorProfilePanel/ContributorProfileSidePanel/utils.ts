import { Maybe, ProfileCover } from "src/__generated/graphql";

export const parseWebsite = (website: Maybe<string>) => {
  try {
    const url = new URL(website || "");
    return {
      hostname: url.hostname,
      url: url.toString(),
    };
  } catch (e) {
    const regex = /^(https?:\/\/)?([^\s:/?#]+)(.*)?$/;

    const matches = (website || "").match(regex);
    if (matches) {
      const protocol = matches[1];
      const hostname = matches[2];
      const path = matches[3];
      return {
        hostname,
        url: `${protocol || "https://"}${hostname}${path || ""}`,
      };
    }
  }
};

export const translateProfileCover = (cover: string): ProfileCover | undefined => {
  switch (cover) {
    case "cyan":
      return ProfileCover.Cyan;
    case "magenta":
      return ProfileCover.Magenta;
    case "yellow":
      return ProfileCover.Yellow;
    case "blue":
      return ProfileCover.Blue;
    default:
      return undefined;
  }
};
