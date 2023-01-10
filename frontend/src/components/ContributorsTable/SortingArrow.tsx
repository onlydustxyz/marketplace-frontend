type PropsType = {
  direction: "up" | "down";
  visible: boolean;
};

const SortingArrow: React.FC<PropsType> = ({ direction, visible }) => (
  <i className={`ri-arrow-${direction}-line font-normal text-fuchsia-700 ${!visible && "invisible"}`} />
);

export default SortingArrow;
