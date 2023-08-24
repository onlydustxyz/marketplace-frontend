import Card from "src/components/Card";

type Props = {
  title: string;
  counter: string;
  description?: string;
};

export default function StatCard({ title, counter, description }: Props) {
  return (
    <Card padded={false} className="flex flex-col bg-noise-light p-4">
      <div className="font-walsheim text-sm font-medium uppercase text-greyscale-300">{title}</div>
      <div className="flex h-full flex-row items-end gap-1">
        <div className="font-belwe text-4xl font-normal text-greyscale-50">{counter}</div>
        <div className="font-walsheim text-base font-normal text-greyscale-200">{description}</div>
      </div>
    </Card>
  );
}
