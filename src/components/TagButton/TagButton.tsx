import { ButtonHTMLAttributes, ComponentProps } from "react";
import Tag from "src/components/Tag";
import { MouseEvent } from "react";

export default function TagButton({
  children,
  onClick,
  as = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { as?: ComponentProps<typeof Tag>["as"] }) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  return (
    <Tag
      as={as}
      className="text-spacePurple-500 duration-200 ease-out transition-all hover:scale-[98%] hover:border-spacePurple-500 hover:text-purple-500"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
