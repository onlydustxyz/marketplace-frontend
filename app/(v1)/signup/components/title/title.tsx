import { TTitle } from "app/(v1)/signup/components/title/title.types";

import { Typo } from "components/atoms/typo";

export function Title({ title, content }: TTitle.Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Typo variant="brand" size="2xl" translate={title} classNames={{ base: "capitalize" }} />
      {!!content && <Typo size="s" color={"text-2"} translate={content} />}
    </div>
  );
}
