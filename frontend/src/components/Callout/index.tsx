import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <div className="z-10 w-full rounded-lg bg-white/8 bg-noise-heavy px-4 py-4 font-walsheim text-sm font-medium text-white backdrop-blur-lg">
      {children}
    </div>
  );
}
