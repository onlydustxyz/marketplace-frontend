export default function SectionTitle({ num, title }: { num: number; title: string }) {
  return (
    <p className="pb-6 pt-6 text-xl font-bold">
      {num}. {title}
    </p>
  );
}
