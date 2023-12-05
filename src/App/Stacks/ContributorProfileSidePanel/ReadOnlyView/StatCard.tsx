import Card from "src/components/Card";

type Props = {
  title: string;
  counter: string | number | undefined;
  description?: string;
  topLeftComponent?: React.ReactElement;
};

export default function StatCard({ title, counter, description, topLeftComponent }: Props) {
  return (
    <Card padded={false} withBg={false} className="flex flex-col bg-noise-light p-4">
      {!topLeftComponent && (
        <div className="font-walsheim text-sm font-medium uppercase text-greyscale-300">{title}</div>
      )}
      {topLeftComponent && (
        <div className="flex w-full items-center justify-between gap-1">
          <div className="font-walsheim text-sm font-medium uppercase text-greyscale-300">{title}</div>
          {topLeftComponent}
        </div>
      )}
      <div className="flex h-full flex-row items-end gap-1">
        <div className="font-belwe text-4xl font-normal text-greyscale-50">{`${counter || 0}`}</div>
        <div className="font-walsheim text-base font-normal text-greyscale-200">{description}</div>
      </div>
    </Card>
  );
}
