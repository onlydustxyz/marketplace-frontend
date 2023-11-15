import { ComponentProps } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import PencilLine from "src/icons/PencilLine";
import { cn } from "src/utils/cn";
import { Avatar } from "../Avatar";

interface HorizontalListItemCardProps {
  AvatarProps?: Partial<ComponentProps<typeof Avatar>>;
  ContainerProps?: Partial<ComponentProps<typeof Card>>;
  avatarUrl: string;
  title: string;
  linkUrl: string;
}

const HorizontalListItemCard: React.FC<HorizontalListItemCardProps> = ({
  AvatarProps = {},
  ContainerProps = {},
  avatarUrl = "",
  title = "",
  linkUrl = "",
}) => {
  const { className: ContainerClassName, ...RestContainerProps } = ContainerProps;
  return (
    <li>
      <Card
        className={cn("bg-card-background-light p-5 shadow-medium", ContainerClassName)}
        fullWidth
        {...RestContainerProps}
      >
        <div className="flex items-center gap-3">
          <Avatar src={avatarUrl} alt={title} size="6" shape="square" {...AvatarProps} />
          <span className="flex-1">{title}</span>
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <Button size={ButtonSize.Sm} type={ButtonType.Secondary} iconOnly data-testid="action-button">
              <PencilLine />
            </Button>
          </a>
        </div>
      </Card>
    </li>
  );
};

export default HorizontalListItemCard;
