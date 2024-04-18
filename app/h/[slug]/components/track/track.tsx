import { components } from "src/__generated/api";

import { TTrack } from "./track.types";

// interface test implements components["schemas"]["HackathonsTrackResponse"] {
//   id: number;
//   name: string;
//   description: string;
//   slug: string;
//   hackathons: number[];
// }
export function Track({ children }: TTrack.Props) {
  return <div>{children}</div>;
}
