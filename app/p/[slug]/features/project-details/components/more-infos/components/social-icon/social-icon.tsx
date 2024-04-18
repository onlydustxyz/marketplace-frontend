import { useMemo } from "react";

import Telegram from "src/assets/icons/Telegram";

import { Icon } from "components/layout/icon/icon";

import { TSocialIcon } from "./social-icon.types";

export function SocialIcon({ url }: TSocialIcon.Props) {
  const socialIcons = {
    ["t.me/"]: <Telegram className="h-4 w-4" />,
    ["discord.com/"]: <Icon remixName="ri-discord-fill" />,
    ["x.com/"]: <Icon remixName="ri-twitter-x-fill" />,
    ["twitter.com/"]: <Icon remixName="ri-twitter-x-fill" />,
    ["github.com/"]: <Icon remixName="ri-github-fill" />,
    ["linkedin.com/"]: <Icon remixName="ri-linkedin-box-fill" />,
    ["wa.me/"]: <Icon remixName="ri-whatsapp-fill" />,
  };

  const key = useMemo(() => {
    return Object.keys(socialIcons).find(key => url.includes(key));
  }, [socialIcons, url]);

  return key ? socialIcons[key as keyof typeof socialIcons] : <Icon remixName="ri-link" />;
}
