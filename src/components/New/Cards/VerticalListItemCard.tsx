import { ComponentProps, FC, PropsWithChildren } from "react";
import { Avatar } from "../Avatar";
import { Flex } from "../Layout/Flex";
import Card from "src/components/Card";
import { cn } from "src/utils/cn";
import InfoIcon from "src/assets/icons/InfoIcon";

export interface VerticalListItemCardProps extends PropsWithChildren {
  AvatarProps?: Partial<ComponentProps<typeof Avatar>>;
  ContainerProps?: Partial<ComponentProps<typeof Card>>;
  ChildrenContainerProps?: {
    className?: string;
  };
  titleComponent?: React.ReactElement;
  title: string;
  avatarSrc: string;
  avatarAlt: string;
  hasUnauthorizedInGithubRepo?: boolean;
}

export const VerticalListItemCard: FC<VerticalListItemCardProps> = ({
  AvatarProps = {},
  ContainerProps = {},
  titleComponent,
  children,
  ChildrenContainerProps = {},
  title,
  avatarAlt,
  avatarSrc,
  hasUnauthorizedInGithubRepo,
}) => {
  const { className: ContainerClassName, ...RestContainerProps } = ContainerProps;

  return (
    <Card
      className={cn("flex w-full flex-col gap-3 bg-card-background-light p-5", ContainerClassName)}
      fullWidth
      {...RestContainerProps}
    >
      <Flex justify="start" item="center" gap={2}>
        {hasUnauthorizedInGithubRepo ? (
          <div className="rounded-lg bg-orange-900 p-2 text-orange-500">
            <InfoIcon className="w-3,5 h-3.5" />
          </div>
        ) : (
          <Avatar src={avatarSrc} alt={avatarAlt} size="6" shape="square" {...AvatarProps} />
        )}

        {titleComponent || <p className=" text-sm font-medium uppercase">{title}</p>}
      </Flex>
      <div className={cn("w-full", ChildrenContainerProps.className)}>{children}</div>
    </Card>
  );
};
