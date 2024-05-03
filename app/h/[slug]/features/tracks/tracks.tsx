import { Track } from "app/h/[slug]/components/track/track";
import { TTracks } from "app/h/[slug]/features/tracks/tracks.types";

export function Tracks({ data }: TTracks.Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6">
      {data.map(track => (
        <Track data={track} key={track.name} />
      ))}
    </div>
  );
}
