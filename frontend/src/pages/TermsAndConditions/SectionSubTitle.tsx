export default function SectionSubTitle({ num, subNum, title }: { num: number; subNum: number; title: string }) {
  return (
    <p className="text-lg font-medium pb-4 pt-4">
      {num}.{subNum} {title}
    </p>
  );
}
