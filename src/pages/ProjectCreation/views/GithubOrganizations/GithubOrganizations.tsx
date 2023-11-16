import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import OrganizationList from "./components/OrganizationList";
import { useIntl } from "src/hooks/useIntl";
import { useContext, useState } from "react";
import { CreateProjectContext } from "../../ProjectCreation.context";

export const GithubOrganizationPage = () => {
  const { T } = useIntl();
  const [isValid, setIsValid] = useState(false);
  const {
    helpers: { next },
  } = useContext(CreateProjectContext);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} innerClassName="h-full">
      <div className="flex h-full items-center justify-center md:p-6">
        <MultiStepsForm
          title={T("project.details.create.organizations.title")}
          description={T("project.details.create.organizations.description")}
          step={1}
          stepCount={3}
          next={next}
          nextDisabled={!isValid}
        >
          <Card withBg={false}>
            <OrganizationList setIsValid={setIsValid} />
            <div className="flex justify-start">
              <a
                href={import.meta.env.VITE_GITHUB_INSTALLATION_URL}
                className="border-lg rounded-lg bg-white px-4 py-2 text-zinc-800"
              >
                {T("project.details.create.organizations.installAnotherOrgs")}
              </a>
            </div>
          </Card>
        </MultiStepsForm>
      </div>
    </Background>
  );
};

export default GithubOrganizationPage;
