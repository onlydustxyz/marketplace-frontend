import { Maybe } from "src/__generated/graphql";

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
