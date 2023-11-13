import { useContext } from "react";
import { useIntl } from "src/hooks/useIntl";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import { EditContext } from "../../../EditContext";

export const EditPanelOrganization = () => {
  const { T } = useIntl();

  const { form, project } = useContext(EditContext);
  const organizations = form?.watch("organizations") || [];

  console.log("organizations", organizations);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="pb-2 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.details.create.organizations.title")}
        </div>
        <div className="font-walsheim text-base font-normal text-spaceBlue-100">
          {T("project.details.create.organizations.description")}
        </div>
      </div>
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations?.map((organization, index: number) => (
          <HorizontalListItemCard
            key={`${organization?.name}+${index}`}
            imageUrl={organization?.avatarUrl ?? ""}
            title={organization?.name || organization?.login || ""}
            linkUrl={`https://github.com/organizations/${organization?.login}/settings/installations/${organization?.installationId}`}
          />
        ))}
      </ul>
      <div className="flex justify-start">
        <a
          href={`${import.meta.env.VITE_GITHUB_INSTALLATION_URL}?state=${project?.slug}`}
          className="border-lg rounded-lg bg-white px-4 py-2 font-medium text-zinc-800"
        >
          {T("project.details.edit.organizations.installGithubApp")}
        </a>
      </div>
    </div>
  );
};
