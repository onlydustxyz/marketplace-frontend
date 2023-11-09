import EyeCheckLine from "src/assets/icons/EyeCheckLine";
import IssueOpen from "src/assets/icons/IssueOpen";
import { FormOption, Size as FormOptionSize } from "src/components/FormOption/FormOption";
import { Datepicker } from "src/components/New/Field/Datepicker";
import { Field } from "src/components/New/Field/Field";
import { useIntl } from "src/hooks/useIntl";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import InformationLine from "src/icons/InformationLine";
import { GithubContributionType } from "src/types";

export function RewardableContributionsField() {
  const { T } = useIntl();

  const typeOptions: { value: GithubContributionType; icon: JSX.Element; label: string }[] = [
    {
      value: GithubContributionType.PullRequest,
      icon: <GitPullRequestLine className="text-base leading-none" />,
      label: T("project.details.edit.fields.rewardableContributions.pullRequests"),
    },
    {
      value: GithubContributionType.Issue,
      icon: <IssueOpen className="h-3.5 w-3.5" />,
      label: T("project.details.edit.fields.rewardableContributions.issues"),
    },
    {
      value: GithubContributionType.CodeReview,
      icon: <EyeCheckLine className="h-4 w-4" />,
      label: T("project.details.edit.fields.rewardableContributions.codeReviews"),
    },
  ];

  return (
    <Field
      label={T("project.details.edit.fields.rewardableContributions.label")}
      name="rewardable_contributions"
      infoMessage={{
        children: T("project.details.edit.fields.rewardableContributions.message"),
        icon: ({ className }) => <InformationLine className={className} />,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-3">
          {typeOptions.map(option => (
            <div className="flex" key={option.value}>
              <FormOption
                as="button"
                size={FormOptionSize.Md}
                // TODO
                // variant={filters.types.includes(option.value) ? Variant.Active : Variant.Default}
                onClick={() => {
                  // TODO
                }}
              >
                {option.icon}
                {option.label}
              </FormOption>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-walsheim text-sm text-greyscale-300">since</span>
          <div className="w-60">
            <Datepicker mode="single" />
          </div>
        </div>
      </div>
    </Field>
  );
}
