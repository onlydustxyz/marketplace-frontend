import { cn } from "src/utils/cn";
import { useIntl } from "src/hooks/useIntl";
import Add from "src/icons/Add";
import Subtract from "src/icons/Subtract";
import EyeOffLine from "src/icons/EyeOffLine";
import EyeLine from "src/icons/EyeLine";
import { withTooltip } from "src/components/Tooltip";
import Button, { ButtonSize, ButtonType } from "src/components/Button";

export enum Action {
  Add = "add",
  Remove = "remove",
  Ignore = "ignore",
  UnIgnore = "unignore",
}

const actionTypes = {
  [Action.Add]: <Add />,
  [Action.Remove]: <Subtract />,
  [Action.Ignore]: <EyeOffLine />,
  [Action.UnIgnore]: <EyeLine />,
};

type GithubActionButtonProps = {
  action: Action;
  ignored: boolean;
  onClick?: () => void;
};

export function GithubActionButton({ action, ignored, onClick }: GithubActionButtonProps) {
  const { T } = useIntl();

  return (
    <div className={cn({ "opacity-70": ignored })}>
      <Button
        size={ButtonSize.Sm}
        type={ButtonType.Secondary}
        onClick={onClick}
        iconOnly
        {...withTooltip(action !== Action.Remove ? T(`githubIssue.tooltip.${action}`) : "", {
          visible: action !== Action.Remove,
        })}
      >
        {actionTypes[action]}
      </Button>
    </div>
  );
}
