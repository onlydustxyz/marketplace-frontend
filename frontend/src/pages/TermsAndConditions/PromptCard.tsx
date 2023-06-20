import OnlyDustLogo, { OnlyDustLogoWidth } from "src/App/Layout/Header/OnlyDustLogo";
import Card from "src/components/Card";

interface TermsAndConditionsPromptCardProps {
  setShowTermsAndConditions: (showTermsAndConditions: boolean) => void;
}

export default function TermsAndConditionsPromptCard({ setShowTermsAndConditions }: TermsAndConditionsPromptCardProps) {
  return (
    <Card
      className="flex flex-col justify-between gap-7 items-center px-24 pt-20 pb-12 relative mx-auto"
      padded={false}
    >
      <div className="absolute -top-10">
        <OnlyDustLogo width={OnlyDustLogoWidth.Large} />
      </div>
      <div className="font-belwe text-3xl">Before you get started...</div>
      <div className="text-center">
        <p>We need you to fully accept our Terms and Conditions.</p>
        <p> Fear not, we’ve made them extra easy to read</p>
      </div>
      <Button onClick={() => setShowTermsAndConditions(true)}>Let’s get reading!</Button>
      <div className="text-spaceBlue-200">
        For any questions,{" "}
        <a className="underline" href="mailto:admin@onlydust.xyz">
          reach out to us
        </a>
      </div>
    </Card>
  );
}
