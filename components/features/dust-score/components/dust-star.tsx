import { Variants, motion } from "framer-motion";
import { useMemo } from "react";

import { cn } from "src/utils/cn";

import star from "./dust-star.svg";
import { TDustStar } from "./dust-star.types";

export function DustStar({ score, scoreKey, onClick, onHover, hoveredKey, isSmall }: TDustStar.Props) {
  const animate: Variants = {
    filled: { filter: "saturate(100%) brightness(100%) contrast(100%)", opacity: 1, transform: "translateY(-1px)" },
    empty: { filter: "saturate(0%) brightness(0%) contrast(0%)" },
    hover: () => ({
      filter: "saturate(100%) brightness(100%) contrast(100%)",
      opacity: 1,
      transform: "translateY(-1px)",
      transition: {
        delay: scoreKey / 20,
      },
    }),
    hoverFilled: { filter: "saturate(100%) brightness(80%) contrast(100%)", transform: "translateY(-1px)" },
  };

  const isFilled = useMemo(() => score >= scoreKey, [score, scoreKey]);
  const isHovered = useMemo(() => hoveredKey >= scoreKey, [hoveredKey, scoreKey]);
  const animateKey = useMemo(() => {
    if (isFilled) {
      if (isHovered) {
        return "hoverFilled";
      }
      return "filled";
    }

    if (isHovered) {
      return "hover";
    }

    return "empty";
  }, [isFilled, isHovered]);

  const onStarClick = () => {
    if (scoreKey === 1 && score === 1) {
      onClick(0);
      return;
    }
    onClick(scoreKey);
    return;
  };

  return (
    <button type={"button"} onClick={onStarClick} className="cursor-pointer p-1 outline-none">
      <motion.img
        src={star.src}
        alt="star"
        variants={animate}
        animate={animateKey}
        transition={{ type: "spring", stiffness: 100 }}
        initial="empty"
        className={cn("h-auto w-6", { "w-4": isSmall })}
        onMouseEnter={() => onHover(scoreKey)}
        onMouseLeave={() => onHover(0)}
      />
    </button>
  );
}
