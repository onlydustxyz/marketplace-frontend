import classNames from "classnames";

type Props = {
  completionScore: number;
};

export default function CompletionBar({ completionScore }: Props) {
  return (
    <div className="relative w-full h-1 bg-white/8 rounded-full">
      <div className="absolute w-full h-full bg-noise-heavy rounded-full">
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
