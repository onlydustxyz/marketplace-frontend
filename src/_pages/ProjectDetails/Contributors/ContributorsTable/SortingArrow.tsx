import { cn } from "src/utils/cn";

type PropsType = {
  direction: "up" | "down";
  visible: boolean;
};

const SortingArrow: React.FC<PropsType> = ({ direction, visible }) => (
  <i
    className={cn(`ri-arrow-${direction}-line text-base font-medium text-spacePurple-500`, {
      invisible: !visible,
    })}
  />
);

export default SortingArrow;
