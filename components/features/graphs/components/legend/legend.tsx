import { cn } from "src/utils/cn";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TLegend } from "./legend.types";

export function Legend({ data, setActiveId, renderTooltip, legendWrapperClassName }: TLegend.Props) {
  function handleMouseEnter(id: string | number) {
    setActiveId(id);
  }

  function handleMouseLeave() {
    setActiveId(null);
  }

  return (
    <Flex direction="col" className={cn("gap-2", legendWrapperClassName)}>
      {data.map(item => (
        <div key={item.id} onMouseEnter={() => handleMouseEnter(item.id)} onMouseLeave={handleMouseLeave}>
          <Tooltip
            placement="right"
            content={
              <Flex direction="col" alignItems="start" className="gap-2">
                <Flex alignItems="center" className="gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  <Typography variant="body-s">{item.label}</Typography>
                </Flex>

                {renderTooltip ? renderTooltip(item) : <Typography variant="body-s-bold">{item.value}</Typography>}
              </Flex>
            }
          >
            <Flex alignItems="center" className="gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <Typography variant="body-m">{item.label}</Typography>
            </Flex>
          </Tooltip>
        </div>
      ))}
    </Flex>
  );
}
