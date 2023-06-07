import Card from "src/components/Card";

type Props = {
  title: string;
  counter: string;
  description?: string;
};

export default function StatCard({ title, counter, description }: Props) {
  return (
    <Card blurred padded={false} className="flex flex-col bg-noise-light p-4">
      <div className="font-walsheim font-medium text-sm uppercase text-greyscale-300">{title}</div>
      <div className="flex flex-row h-full items-end gap-1">
        <div className="font-belwe font-normal text-4xl text-greyscale-50">{counter}</div>
        <div className="font-walsheim font-normal text-base text-greyscale-200">{description}</div>
      </div>
    </Card>
  );
}
