import { cn } from "src/utils/cn";

import { TFormBannerButton } from "./banner-button.types";

export function BannerButton({ active, cover, onClick }: TFormBannerButton.Props) {
  const handleClick = () => {
    onClick(cover);
  };

  return (
    <button
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full opacity-50 transition-opacity hover:opacity-100",
        {
          "border border-greyscale-50/8": !active,
          "border-2 border-greyscale-50/20 opacity-100": active,
        }
      )}
      onClick={handleClick}
      disabled={active}
    >
      <span
        className={cn("relative h-4 w-4 rounded-full bg-gradient-to-b", {
          "from-[#009989] to-[#99FFF4]": cover === "CYAN",
          "from-[#BE33FF] to-[#1E2551]": cover === "MAGENTA",
          "from-[#FF9000] to-[#FFD399]": cover === "YELLOW",
          "from-[#0009BC] to-[#666BD7]": cover === "BLUE",
        })}
      />
    </button>
  );
}
