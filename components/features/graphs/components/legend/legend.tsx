import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TLegend } from "./legend.types";

export function Legend({ data, setActiveId }: TLegend.Props) {
  function handleMouseEnter(id: string | number) {
    setActiveId(id);
  }

  function handleMouseLeave() {
    setActiveId(null);
  }

  return (
    <Flex direction="col" className="gap-2">
      {data.map(item => (
        <div key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
          <Flex alignItems="center" className="gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <Typography variant="body-m">{item.label}</Typography>
          </Flex>
        </div>
      ))}
    </Flex>
  );
}
