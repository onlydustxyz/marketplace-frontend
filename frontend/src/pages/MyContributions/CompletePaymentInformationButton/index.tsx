import { PropsWithChildren } from "react";

export default function CompletePaymentInformationButton({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row justify-between items-center gap-2 w-fit rounded-xl bg-neutral-100 shadow-inner-bottom-sm hover:shadow-inner-bottom-md shadow-neutral-400 px-6 py-4 text-black text-base font-medium hover:cursor-pointer">
      {children}
    </div>
  );
}
