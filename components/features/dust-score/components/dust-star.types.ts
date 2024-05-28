export namespace TDustStar {
  export interface Props {
    onClick: (score: number) => void;
    onHover: (scoreKey: number) => void;
    hoveredKey: number;
    scoreKey: number;
    score: number;
    isSmall?: boolean;
  }
}
