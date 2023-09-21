import { PropsWithChildren } from "react";
import Tag from "src/components/Tag";
import { MouseEvent } from "react";

type TagButtonProps = {
  onClick: () => void;
} & PropsWithChildren;

export default function TagButton({ children, onClick, ...rest }: TagButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <Tag
      as="button"
      className="text-spacePurple-500 transition-all delay-150 duration-200 ease-out hover:border-spacePurple-500 hover:px-[10px] hover:text-purple-500"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
