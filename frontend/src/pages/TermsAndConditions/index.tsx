import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button from "src/components/Button";
import Card from "src/components/Card";

export const TermsAndConditions = () => {
  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="h-full flex flex-col justify-center items-center">
        <div>
          <Card className="flex flex-col justify-between items-center w-5/12 h-96">
            <div className="font-belwe text-3xl">Before you get started...</div>
            <div>We need you to fully accept our Terms and Conditions.</div>
            <div> Fear not, we’ve made them extra easy to read</div>
            <Button>Let’s get reading!</Button>
            <div>For any questions, reach out to us</div>
          </Card>
        </div>
      </div>
    </Background>
  );
};
