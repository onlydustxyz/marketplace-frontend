import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";

interface LinkProps {
  link: string;
}

export default function GithubLink({ link }: LinkProps) {
  return (
    <BaseLink href={link}>
      <Button size="s" variant="secondary" iconOnly>
        <Icon remixName="ri-github-fill" className="fill-neutral-100" />
      </Button>
    </BaseLink>
  );
}
