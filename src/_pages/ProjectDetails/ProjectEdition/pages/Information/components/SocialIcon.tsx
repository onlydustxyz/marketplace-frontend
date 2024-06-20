import Link from "src/icons/Link";

import { Icon } from "components/layout/icon/icon";

const getSocialIcon = (searchString: string, className?: string) => {
  const socialIcons = {
    ["t.me/"]: <Icon remixName="ri-telegram-2-fill" className={className} />,
    ["discord.com/"]: <Icon remixName="ri-discord-fill" className={className} />,
    ["x.com/"]: <Icon remixName="ri-twitter-x-fill" className={className} />,
    ["twitter.com/"]: <Icon remixName="ri-twitter-x-fill" className={className} />,
    ["github.com/"]: <Icon remixName="ri-github-fill" className={className} />,
    ["linkedin.com/"]: <Icon remixName="ri-linkedin-box-fill" className={className} />,
    ["wa.me/"]: <Icon remixName="ri-whatsapp-fill" className={className} />,
  };

  const key = Object.keys(socialIcons).find(key => searchString.includes(key));
  return key ? socialIcons[key as keyof typeof socialIcons] : undefined;
};

type Props = {
  search: string;
  className?: string;
};

export function SocialIcon({ search, className }: Props) {
  return getSocialIcon(search, className) || <Link className={className} />;
}
