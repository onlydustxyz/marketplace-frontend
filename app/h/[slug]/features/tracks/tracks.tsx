import { Track } from "app/h/[slug]/components/track/track";

import { TTracks } from "./tracks.types";

export function Tracks({ data }: TTracks.Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6">
      {data.map(track => (
        <Track data={track} key={track.name} />
      ))}
    </div>
  );
}
