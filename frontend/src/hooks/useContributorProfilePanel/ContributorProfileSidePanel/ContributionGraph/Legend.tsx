import { ReactElement } from "react";
import { LegendProps } from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

type Props = {
  payload?: ({
    payload?: {
      dot: ReactElement;
    };
  } & Payload)[];
} & LegendProps;

export default function Legend({ payload = [] }: Props) {
  return (
    <div className="flex flex-row gap-6 my-1.5 items-center justify-center w-full text-xs text-greyscale-50 font-walsheim font-normal">
      {payload.map(payload => (
        <div key={payload.value}>
          <div className="flex flex-row gap-1 items-center">
            {payload.payload?.dot}
            {payload.value}
          </div>
        </div>
      ))}
    </div>
  );
}
