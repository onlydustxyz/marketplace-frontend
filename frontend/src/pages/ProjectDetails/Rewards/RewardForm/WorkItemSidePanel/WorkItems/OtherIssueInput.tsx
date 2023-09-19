import classNames from "classnames";
import { useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import {
  GithubIssueFragment,
  GithubPullRequestFragment,
  LiveGithubIssueFragment,
  LiveGithubPullRequestFragment,
  WorkItemFragment,
  WorkItemType,
  useFetchIssueLazyQuery,
  useFetchPullRequestLazyQuery,
} from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import Link from "src/icons/Link";
import {
  REGEX_VALID_GITHUB_ISSUE_URL,
  REGEX_VALID_GITHUB_PULL_REQUEST_URL,
  parseIssueLink,
  parsePullRequestLink,
} from "src/utils/github";
import {
  issueToWorkItem,
  pullRequestToWorkItem,
} from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/WorkItems/WorkItems";

type Props = {
  projectId: string;
  type: WorkItemType;
  addWorkItem: (workItem: WorkItemFragment) => void;
};

export default function OtherIssueInput({ type, addWorkItem }: Props) {
  const { T } = useIntl();
  const inputName = type === WorkItemType.Issue ? "otherIssueLink" : "otherPullRequestLink";
  const tKey = type === WorkItemType.Issue ? "issues" : "pullRequests";

  const [fetchIssue] = useFetchIssueLazyQuery({
    onCompleted: data => {
      if (data.fetchIssue) {
        addWorkItem(issueToWorkItem(liveIssueToCached(data.fetchIssue)));
        resetField(inputName);
      } else {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      }
    },
    onError: () =>
      setError(inputName, {
        type: "validate",
        message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const [fetchPullRequest] = useFetchPullRequestLazyQuery({
    onCompleted: data => {
      if (data.fetchPullRequest) {
        addWorkItem(pullRequestToWorkItem(livePullRequestToCached(data.fetchPullRequest)));
        resetField(inputName);
      } else {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      }
    },
    onError: () =>
      setError(inputName, {
        type: "validate",
        message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: inputName });
  const otherIssueLink = watch(inputName);
  const otherIssueLinkError = errors[inputName];

  const { repoOwner, repoName, issueNumber } = useMemo(
    () => (type === WorkItemType.Issue ? parseIssueLink(otherIssueLink) : parsePullRequestLink(otherIssueLink)),
    [otherIssueLink]
  );

  const validateOtherIssue = () =>
    type === WorkItemType.Issue
      ? fetchIssue({
          variables: {
            repoOwner,
            repoName,
            issueNumber,
          },
        })
      : fetchPullRequest({
          variables: {
            repoOwner,
            repoName,
            prNumber: issueNumber,
          },
        });

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-greyscale-50/12 p-4">
      <div className="font-walsheim text-base font-medium text-greyscale-50">
        {T(`reward.form.contributions.${tKey}.addOther.label`)}
      </div>
      <Input
        name={inputName}
        placeholder={T(`reward.form.contributions.${tKey}.addOther.placeholder`)}
        withMargin={false}
        options={{
          pattern: {
            value: type === WorkItemType.Issue ? REGEX_VALID_GITHUB_ISSUE_URL : REGEX_VALID_GITHUB_PULL_REQUEST_URL,
            message: T(`reward.form.contributions.${tKey}.addOther.notALink`),
          },
        }}
        inputClassName="pl-10"
        onKeyDown={event => event.key === "Enter" && validateOtherIssue()}
        prefixComponent={
          <div className="mt-0.5">
            <Link
              className={classNames("text-xl", {
                "text-spaceBlue-200": !otherIssueLink,
                "text-greyscale-50": otherIssueLink && !otherIssueLinkError,
                "text-orange-500": otherIssueLinkError,
              })}
            />
          </div>
        }
        inputProps={{ autoFocus: true }}
      >
        <div onClick={validateOtherIssue} data-testid={`add-other-${tKey}-btn`}>
          <Button
            size={ButtonSize.LgLowHeight}
            type={ButtonType.Secondary}
            disabled={!otherIssueLink || !!otherIssueLinkError}
          >
            {T("reward.form.contributions.add")}
          </Button>
        </div>
      </Input>
    </div>
  );
}

export const liveIssueToCached = (issue: LiveGithubIssueFragment): GithubIssueFragment => ({
  ...issue,
  __typename: "GithubIssues",
  assigneeIds: [],
  commentsCount: 0,
});

export const livePullRequestToCached = (issue: LiveGithubPullRequestFragment): GithubPullRequestFragment => ({
  ...issue,
  __typename: "GithubPullRequests",
  author: {
    login: "stannislas",
    avatarUrl: "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
    htmlUrl: "https://github.com/stannislas",
    id: 123,
    user: { id: 233 },
  },
});
