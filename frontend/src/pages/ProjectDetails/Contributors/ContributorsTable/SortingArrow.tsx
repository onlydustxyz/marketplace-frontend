import classNames from "classnames";

type PropsType = {
  direction: "up" | "down";
  visible: boolean;
};

const SortingArrow: React.FC<PropsType> = ({ direction, visible }) => (
  <i
    className={classNames(`ri-arrow-${direction}-line text-base font-medium text-spacePurple-500`, {
      invisible: !visible,
    })}
  />
);

export default SortingArrow;
