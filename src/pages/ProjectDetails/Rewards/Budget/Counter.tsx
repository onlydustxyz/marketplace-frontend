import { useIntl } from "src/hooks/useIntl";

type CounterProps = {
  count?: number;
  total?: number;
};

export function Counter(props: CounterProps) {
  const { T } = useIntl();
  if (!props) return null;

  return (
    <>
      {props.count}
      {props.total ? (
        <div className="font-weigth-400 ml-1 font-walsheim text-base text-spaceBlue-200">
          {T("project.details.remainingBudget.budget.sentRewards", { count: props.total })}
        </div>
      ) : null}
    </>
  );
}
