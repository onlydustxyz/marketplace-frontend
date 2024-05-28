import { useEffect, useState } from "react";

import { cn } from "src/utils/cn";

import { DustStar } from "components/features/dust-score/components/dust-star";

import { TDustScore } from "./dust-score.types";

export function DustScore({ canUpdate = true, initialScore, onScoreChange, isSmall }: TDustScore.Props) {
  const [score, setScore] = useState(initialScore);
  const [hovered, setHovered] = useState(0);

  function handleScoreChange(newScore: number) {
    setScore(newScore);
    onScoreChange?.(newScore);
  }

  function handleHoveredChange(newScore: number) {
    setHovered(newScore);
  }

  useEffect(() => {
    if (!score) {
      setScore(initialScore);
    }
  }, [initialScore]);

  return (
    <div
      className={cn("flex flex-row items-center justify-start", {
        "pointer-events-none": !canUpdate || !onScoreChange,
      })}
    >
      <DustStar
        score={score}
        scoreKey={1}
        onClick={handleScoreChange}
        onHover={handleHoveredChange}
        hoveredKey={hovered}
        isSmall={isSmall}
      />
      <DustStar
        score={score}
        scoreKey={2}
        onClick={handleScoreChange}
        onHover={handleHoveredChange}
        hoveredKey={hovered}
        isSmall={isSmall}
      />
      <DustStar
        score={score}
        scoreKey={3}
        onClick={handleScoreChange}
        onHover={handleHoveredChange}
        hoveredKey={hovered}
        isSmall={isSmall}
      />
      <DustStar
        score={score}
        scoreKey={4}
        onClick={handleScoreChange}
        onHover={handleHoveredChange}
        hoveredKey={hovered}
        isSmall={isSmall}
      />
      <DustStar
        score={score}
        scoreKey={5}
        onClick={handleScoreChange}
        onHover={handleHoveredChange}
        hoveredKey={hovered}
        isSmall={isSmall}
      />
    </div>
  );
}
