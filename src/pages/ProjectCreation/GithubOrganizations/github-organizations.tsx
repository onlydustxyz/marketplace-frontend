import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import OrganizationList from "./organization-list";

export const GithubOrganizationPage = () => {
  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <div className="flex items-center justify-center p-4 pt-[72px]">
        <MultiStepsForm
          title="Which organisations are concerned ?"
          description="Please install the github app on the desired github organisation(s) containing the repositories you want to add."
          step={1}
          stepCount={3}
          // submit
          // submitDisabled={!isValid}
          next="../repository"
        >
          <Card withBg={false}>
            <OrganizationList />
            <hr className="mb-4 border-greyscale-50/20 lg:mb-6" />
            <div className="flex justify-start">
              <a
                href={import.meta.env.VITE_GITHUB_INSTALLATION_URL ?? ""}
                className="border-lg rounded-lg bg-white px-4 py-2 text-zinc-800"
              >
                Install to another organisation
              </a>
            </div>
          </Card>
        </MultiStepsForm>
      </div>
    </Background>
  );
};

export default GithubOrganizationPage;
