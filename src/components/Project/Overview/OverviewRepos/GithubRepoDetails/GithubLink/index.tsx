import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Button size="s" variant="secondary" iconOnly>
        <Icon remixName="ri-github-fill" className="fill-neutral-100" />
      </Button>
    </a>
  );
}
