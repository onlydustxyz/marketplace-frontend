import Lightbulb from "src/assets/icons/Lightbulb";
import { IMAGES } from "src/assets/img";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";
import Card from "src/components/Card";
import GithubLogo from "src/icons/GithubLogo";
import { useEffect } from "react";
import { useResetSession } from "../commons/hooks/useProjectCreationSession";

export const ProjectCreationPage = () => {
  const { reset } = useResetSession();

  useEffect(() => {
    reset();
  }, []);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="flex h-screen items-center justify-center">
        <Card
          fullWidth={true}
          padded={false}
          className="relative flex w-full max-w-[688px] flex-col items-center p-12 pt-[72px]"
        >
          <div className="absolute top-0 -translate-y-1/2">
            <img src={IMAGES.gradient.compass} className="h-[72px] w-[72px]"></img>
          </div>
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium uppercase text-spaceBlue-200">Submit project</span>
                <div className="text-center font-belwe text-3xl font-normal text-greyscale-50">
                  Kickstart your open source journey
                </div>
              </div>
              <p className="whitespace-pre-line text-center text-greyscale-50">
                Want your project to join the stellar OnlyDust galaxy? How exciting! We just need you to review
                permission details to get started.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <a href={import.meta.env.VITE_GITHUB_INSTALLATION_URL ?? ""}>
                <Button size={ButtonSize.Lg}>
                  <GithubLogo className="h-6 w-6" />
                  Connect with GitHub
                </Button>
              </a>
              <div
                id="onboarding-skip"
                className="flex items-center gap-2 align-baseline font-medium text-spaceBlue-200"
              >
                <Lightbulb className="h-6 w-6 fill-spaceBlue-200" />
                <span>We need your permission to connect with your github repositories</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Background>
  );
};

export default ProjectCreationPage;
