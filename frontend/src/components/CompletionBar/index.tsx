import classNames from "classnames";

type Props = {
  completionScore: number;
};

export default function CompletionBar({ completionScore }: Props) {
  return (
    <div className="relative h-1 w-full rounded-full bg-white/8">
      <div className="absolute h-full w-full rounded-full bg-noise-heavy">
        <div
          className={classNames("absolute inset-y-0 left-0 bg-gradient-to-r from-spacePurple-500 to-midBlue-300", {
            "rounded-full": completionScore === 100,
            "rounded-l-full": completionScore < 100,
          })}
          style={{
            width: `${completionScore}%`,
          }}
        />
      </div>
    </div>
  );
}
