import { Typo } from "components/atoms/typo";

import { TTitle } from "./title.types";

export function Title({ title, content }: TTitle.Props) {
  return (
    <div className="flex w-full flex-col gap-2">
      <Typo variant="brand" size="2xl" translate={title} />
      {!!content && <Typo size="s" color={"text-2"} translate={content} />}
    </div>
  );
}
