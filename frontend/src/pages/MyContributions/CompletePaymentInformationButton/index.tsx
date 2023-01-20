import { PropsWithChildren } from "react";

export default function CompletePaymentInformationButton({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row justify-between items-center gap-2 w-fit px-6 py-4 rounded-xl text-spaceBlue-900 text-base font-medium bg-greyscale-50 shadow-bottom-sm hover:cursor-pointer hover:text-spacePurple-900 hover:shadow-none hover:outline hover:outline-4 hover:outline-spacePurple-800  hover:bg-spacePurple-50 ">
      {children}
    </div>
  );
}
