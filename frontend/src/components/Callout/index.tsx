import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <div className="py-4 px-4 z-10 rounded-lg w-full bg-noise-heavy bg-white/8 font-walsheim font-medium text-sm text-white backdrop-blur-lg">
      {children}
    </div>
  );
}
