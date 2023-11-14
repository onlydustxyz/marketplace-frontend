import { forwardRef } from "react";
import { components } from "src/__generated/api";
import EyeCheckLine from "src/assets/icons/EyeCheckLine";
import IssueOpen from "src/assets/icons/IssueOpen";
import { FormOption, Size as FormOptionSize, Variant } from "src/components/FormOption/FormOption";
import { DatepickProps, Datepicker } from "src/components/New/Field/Datepicker";
import { Field } from "src/components/New/Field/Field";
import { useIntl } from "src/hooks/useIntl";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import InformationLine from "src/icons/InformationLine";
import { GithubContributionType } from "src/types";

type RewardableContributionsFieldProps = {
  value?: components["schemas"]["ProjectRewardSettings"];
  onChange: (data: components["schemas"]["ProjectRewardSettings"]) => void;
};

export const RewardableContributionsField = forwardRef(function RewardableContributionsField(
  { value, onChange }: RewardableContributionsFieldProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { T } = useIntl();

  function handleContributionChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    value &&
      onChange({
        ...value,
        [e.target.name]: !value[e.target.name as keyof typeof value],
      });
  }

  function handleDateChange(date: DatepickProps) {
    onChange({ ...value, ignoreContributionsBefore: date.toString() });
  }

  const typeOptions: { name: string; value: GithubContributionType; icon: JSX.Element; label: string }[] = [
    {
      name: "ignorePullRequests",
      value: GithubContributionType.PullRequest,
      icon: <GitPullRequestLine className="text-base leading-none" />,
      label: T("project.details.edit.fields.rewardableContributions.pullRequests"),
    },
    {
      name: "ignoreIssues",
      value: GithubContributionType.Issue,
      icon: <IssueOpen className="h-3.5 w-3.5" />,
      label: T("project.details.edit.fields.rewardableContributions.issues"),
    },
    {
      name: "ignoreCodeReviews",
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
                ref={ref}
                as="button"
                size={FormOptionSize.Md}
                name={option.name}
                value={option.value}
                variant={value?.[option.name as keyof typeof value] ? Variant.Default : Variant.Active}
                onClick={handleContributionChange}
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
            <Datepicker mode="single" value={value?.ignoreContributionsBefore} onChange={handleDateChange} />
          </div>
        </div>
      </div>
    </Field>
  );
});
