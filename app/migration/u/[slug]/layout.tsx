import { PropsWithChildren } from "react";

function PublicProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="scrollbar-sm relative z-[1] h-full w-full overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:px-12 md:py-14 md:pb-12 ">{children}</div>
    </div>
  );
}

export default PublicProfileLayout;
