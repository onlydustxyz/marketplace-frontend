export default function SectionTitle({ num, title }: { num: number; title: string }) {
  return (
    <p className="text-xl font-bold pb-6 pt-6">
      {num}. {title}
    </p>
  );
}
