import { PropsWithChildren } from "react";

import { Sidebar } from "app/settings/components/sidebar";

import Header from "src/App/Layout/Header";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    // This outer div should be in the root layout
    <div className="fixed flex h-[calc(100dvh)] w-screen flex-col">
      <Header />
      <div className="flex h-0 w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
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
