import { ComponentProps, ReactElement } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import PencilLine from "src/icons/PencilLine";
import { cn } from "src/utils/cn";
import { Avatar } from "../Avatar";
import { withTooltip } from "src/components/Tooltip";
import { GithubLink } from "src/components/GithubCard/GithubLink/GithubLink";

interface HorizontalListItemCardProps {
  AvatarProps?: Partial<ComponentProps<typeof Avatar>>;
  ContainerProps?: Partial<ComponentProps<typeof Card>>;
  avatarUrl: string;
  title: string;
  linkUrl: string;
  linkClick?: () => void;
  linkIcon?: ReactElement;
  isExternalFlow?: boolean;
  disabled?: boolean;
  tooltip?: string;
  htmlUrl: string;
}

const HorizontalListItemCard: React.FC<HorizontalListItemCardProps> = ({
  AvatarProps = {},
  ContainerProps = {},
  avatarUrl = "",
  title = "",
  linkUrl = "",
  linkClick,
  linkIcon = <PencilLine />,
  isExternalFlow = true,
  disabled = false,
  tooltip,
  htmlUrl,
}) => {
  const { className: ContainerClassName, ...RestContainerProps } = ContainerProps;
  console.log(title, htmlUrl);
  return (
    <li>
      <Card
        className={cn("bg-card-background-light p-4 shadow-medium lg:p-4", ContainerClassName)}
        fullWidth
        {...RestContainerProps}
      >
        <div className="flex items-center gap-3">
          <Avatar src={avatarUrl} alt={title} size="6" shape="square" {...AvatarProps} />
          <span className="flex-1">
            <GithubLink url={htmlUrl} text={title} />
          </span>
          <a
            href={linkUrl}
            onClick={linkClick}
            target={isExternalFlow ? "_blank" : undefined}
            rel={isExternalFlow ? "noopener noreferrer" : undefined}
          >
            <Button
              size={ButtonSize.Sm}
              type={ButtonType.Secondary}
              iconOnly
              data-testid="action-button"
              disabled={disabled}
              {...withTooltip(tooltip || "", {
                visible: disabled && !!tooltip,
              })}
            >
              {linkIcon}
            </Button>
          </a>
        </div>
      </Card>
    </li>
  );
};

export default HorizontalListItemCard;
