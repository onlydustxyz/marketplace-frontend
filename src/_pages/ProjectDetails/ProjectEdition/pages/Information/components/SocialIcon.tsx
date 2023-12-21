import Telegram from "src/assets/icons/Telegram";
import DiscordFill from "src/icons/DiscordFill";
import GithubLogo from "src/icons/GithubLogo";
import Link from "src/icons/Link";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import TwitterFill from "src/icons/TwitterFill";
import WhatsappFill from "src/icons/WhatsappFill";

const getSocialIcon = (searchString: string, className?: string) => {
  const socialIcons = {
    ["t.me/"]: <Telegram className={className} />,
    ["discord.com/"]: <DiscordFill className={className} />,
    ["twitter.com/"]: <TwitterFill className={className} />,
    ["github.com/"]: <GithubLogo className={className} />,
    ["linkedin.com/"]: <LinkedinBoxFill className={className} />,
    ["wa.me/"]: <WhatsappFill className={className} />,
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
