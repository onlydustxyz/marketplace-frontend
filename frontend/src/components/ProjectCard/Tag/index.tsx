import { PropsWithChildren } from "react";

export type TagProps = {
  id?: string;
  testid?: string;
} & PropsWithChildren;

export default function Tag({ id, testid, children }: TagProps) {
  return (
    <div
      id={id}
      className="h-6 flex flex-row border border-neutral-600 w-fit px-2 py-1.5
				rounded-2xl gap-1 text-xs items-center"
      data-testid={testid}
    >
      {children}
    </div>
  );
}
