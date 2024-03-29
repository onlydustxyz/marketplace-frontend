import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Button from "src/components/Button";
import Card from "src/components/Card";

interface TermsAndConditionsPromptCardProps {
  setShowTermsAndConditions: (showTermsAndConditions: boolean) => void;
}

export default function TermsAndConditionsPromptCard({ setShowTermsAndConditions }: TermsAndConditionsPromptCardProps) {
  return (
    <div className="pb-6 pt-16">
      <Card
        className="relative mx-auto flex flex-col items-center justify-between gap-7 px-12 pb-12 pt-20 xl:px-24"
        padded={false}
      >
        <div className="absolute -top-10">
          <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
        </div>
        <div className="text-center font-belwe text-3xl">Before you get started...</div>
        <div className="text-center">
          <p>We need you to fully accept our Terms and Conditions.</p>
          <p> Fear not, we’ve made them extra easy to read.</p>
        </div>
        <Button onClick={() => setShowTermsAndConditions(true)}>Let’s get reading!</Button>
        <div className="text-sm text-spaceBlue-200 xl:text-base">
          For any questions,{" "}
          <a className="underline" href="mailto:admin@onlydust.xyz">
            reach out to us
          </a>
        </div>
      </Card>
    </div>
  );
}
