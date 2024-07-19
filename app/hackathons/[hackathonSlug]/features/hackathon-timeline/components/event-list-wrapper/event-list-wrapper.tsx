import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";

import { TEventListWrapper } from "./event-list-wrapper.types";

export function EventListWrapper({ children, title }: TEventListWrapper.Props) {
  if (!children) return null;

  return (
    <Paper size="s" container="2" classNames={{ base: "flex flex-col" }}>
      <div className="pb-3">
        <Typo variant="brand" size={"xl"}>
          {title}
        </Typo>
      </div>
      {children}
    </Paper>
  );
}
