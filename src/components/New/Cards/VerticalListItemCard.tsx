import { ComponentProps, FC, PropsWithChildren } from "react";
import { Avatar } from "../Avatar";
import { Flex } from "../Layout/Flex";
import Card from "src/components/Card";
import { cn } from "src/utils/cn";

export interface VerticalListItemCardProps extends PropsWithChildren {
  AvatarProps?: Partial<ComponentProps<typeof Avatar>>;
  ContainerProps?: Partial<ComponentProps<typeof Card>>;
  ChildrenContainerProps?: {
    className?: string;
  };
  titleComponent?: React.ReactElement;
  avatarComponent?: React.ReactElement;
  actionComponent?: React.ReactElement;
  title: string;
  avatarSrc: string;
  avatarAlt: string;
  hasUnauthorizedInGithubRepo?: boolean;
}

export const VerticalListItemCard: FC<VerticalListItemCardProps> = ({
  AvatarProps = {},
  ContainerProps = {},
  titleComponent,
  avatarComponent,
  actionComponent,
  children,
  ChildrenContainerProps = {},
  title,
  avatarAlt,
  avatarSrc,
}) => {
  const { className: ContainerClassName, ...RestContainerProps } = ContainerProps;

  return (
    <Card
      className={cn("flex w-full flex-col gap-3 bg-card-background-light p-5", ContainerClassName)}
      fullWidth
      {...RestContainerProps}
    >
      <Flex className="items-center justify-between">
        <Flex justify="start" item="center" gap={2}>
          {avatarComponent || <Avatar src={avatarSrc} alt={avatarAlt} size="6" shape="square" {...AvatarProps} />}
          {titleComponent || <p className=" text-sm font-medium uppercase">{title}</p>}
        </Flex>

        {actionComponent}
      </Flex>
      <div className={cn("w-full", ChildrenContainerProps.className)}>{children}</div>
    </Card>
  );
};
