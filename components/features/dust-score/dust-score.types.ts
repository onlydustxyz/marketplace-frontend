export namespace TDustScore {
  export interface Props {
    canUpdate?: boolean;
    initialScore: number;
    onScoreChange?: (score: number) => void;
    isSmall?: boolean;
  }
}
