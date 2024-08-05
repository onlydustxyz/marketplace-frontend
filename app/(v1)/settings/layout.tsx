import { PropsWithChildren } from "react";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

import Sidebar from "./components/sidebar/sidebar";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-screen flex-col overflow-hidden border-0 border-t-0 border-black xl:border-[24px] xl:border-t-0">
      <div className="flex h-0 w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:flex-row xl:gap-2 xl:pt-0">
        <Sidebar />

        <div className="relative h-full w-full overflow-hidden xl:rounded-r-2xl">
          <ScrollView>
            <div className="mx-auto flex max-w-7xl flex-1 flex-col gap-4 px-4 py-6 pb-32 xl:px-8">{children}</div>
          </ScrollView>
        </div>
      </div>
    </div>
  );
}
