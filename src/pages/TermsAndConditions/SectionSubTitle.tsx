export default function SectionSubTitle({ num, subNum, title }: { num: number; subNum: number; title: string }) {
  return (
    <p className="pb-4 pt-4 text-lg font-medium">
      {num}.{subNum} {title}
    </p>
  );
}
