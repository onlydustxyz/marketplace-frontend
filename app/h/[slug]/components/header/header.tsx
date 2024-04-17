import { BackButton } from "app/h/[slug]/components/back-button/back-button";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";

export function Header() {
  return (
    // use fixed height to mock the header
    <div className="flex h-full w-full flex-col items-start justify-start gap-11 overflow-hidden rounded-t-[32px] bg-spacePurple-500 pt-8">
      <Wrapper>
        <BackButton />
      </Wrapper>
    </div>
  );
}
