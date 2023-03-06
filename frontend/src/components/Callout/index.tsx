import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <div className="p-3 rounded-lg w-full bg-noise-heavy bg-white/8 font-walsheim font-medium text-sm text-white">
      {children}
    </div>
  );
}
