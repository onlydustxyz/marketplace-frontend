import { PropsWithChildren } from "react";

import { Sidebar } from "app/migration/settings/components/sidebar";

import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    // This outer div should be in the root layout
    <div className="flex h-[calc(100dvh)] w-screen flex-col xl:fixed">
      <div className="flex w-full flex-1 flex-col gap-4 overflow-hidden pt-4 xl:h-0 xl:flex-row xl:gap-2 xl:p-6 xl:pt-0">
        <Sidebar />

        <ScrollView className="bg-space bg-no-repeat xl:rounded-r-2xl">
          <div className="mx-auto flex h-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 xl:px-8">{children}</div>
        </ScrollView>
      </div>
    </div>
  );
}
