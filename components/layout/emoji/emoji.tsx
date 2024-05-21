import { TEmoji } from "components/layout/emoji/emoji.types";

export function Emoji({ label, symbol }: TEmoji.Props) {
  return (
    <span className="od-text-title-s" role="img" aria-label={label ? label : ""} aria-hidden={label ? "false" : "true"}>
      {symbol}
    </span>
  );
}
