import { Icon } from "components/layout/icon/icon";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";

import { TTableContainer } from "./table-container.types";

export function TableContainer({ children, title, description, icon, iconProps }: TTableContainer.Props) {
  return (
    <section
      className={
        "flex max-h-full flex-col overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base shadow-heavy"
      }
    >
      <header
        className={
          "flex items-start justify-between gap-6 border-b border-card-border-light bg-card-background-light px-6 py-4 md:items-center"
        }
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-card-background-medium p-3 leading-none text-greyscale-50">
            {icon ? icon : null}
            {iconProps ? <Icon className={"h-5 w-5"} {...iconProps} /> : null}
          </div>
          <div className="font-walsheim">
            <Translate as={"p"} token={title} className="text-base font-medium text-greyscale-50" />
            <Translate as={"p"} token={description} className="text-sm text-spaceBlue-200" />
          </div>
        </div>
      </header>

      <ScrollView>{children}</ScrollView>
    </section>
  );
}
