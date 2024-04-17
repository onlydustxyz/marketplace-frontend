import { BackButton } from "app/h/[slug]/components/back-button/back-button";

export function Header() {
  return (
    // use fixed height to mock the header
    <div className="flex h-[254px] w-full flex-col items-start justify-start gap-11 overflow-hidden rounded-t-[32px] bg-spacePurple-500 pl-28 pt-8">
      <BackButton />
    </div>
  );
}
