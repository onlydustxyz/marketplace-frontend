import { TFormWalletSection } from "./section.types";

export function FormWalletSection({ children }: TFormWalletSection.Props) {
  return (
    <>
      {children}

      <span className="my-4 block h-px bg-greyscale-50/8" />
    </>
  );
}
