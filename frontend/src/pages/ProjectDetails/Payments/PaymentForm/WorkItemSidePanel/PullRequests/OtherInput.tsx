import { useMemo } from "react";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Input from "src/components/FormInput";
import { WorkItem } from "src/components/GithubIssue";
import { gql } from "@apollo/client";
import { FetchPullRequestQuery, IssueDetailsFragmentDoc } from "src/__generated/graphql";
import { useHasuraLazyQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { useFormContext, useFormState } from "react-hook-form";
import { parsePullRequestLink, REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "src/utils/github";

type Props = {
  onWorkItemAdded: (workItem: WorkItem) => void;
};

const INPUT_NAME = "otherPrLink";

export default function OtherPrInput({ onWorkItemAdded }: Props) {
  const { T } = useIntl();

  const [fetchPullRequest] = useHasuraLazyQuery<FetchPullRequestQuery>(
    FETCH_PR_DETAILS,
    HasuraUserRole.RegisteredUser,
    {
      onCompleted: data => {
        if (data.fetchPullRequest) {
          onWorkItemAdded(data.fetchPullRequest);
          resetField(INPUT_NAME);
        } else {
          setError(INPUT_NAME, {
            type: "validate",
            message: T("payment.form.workItems.addOtherPR.invalidPrLink"),
          });
        }
      },
    }
  );

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: INPUT_NAME });
  const otherPrLink = watch(INPUT_NAME);
  const otherPrLinkError = errors[INPUT_NAME];

  const { repoOwner, repoName, prNumber } = useMemo(() => parsePullRequestLink(otherPrLink), [otherPrLink]);

  const validateOtherPR = () => {
    fetchPullRequest({
      variables: {
        repoOwner,
        repoName,
        prNumber,
      },
    });
  };

  return (
    <div className="p-4 flex flex-col gap-2 border border-greyscale-50/12 rounded-lg">
      <div className="font-walsheim font-medium text-base text-greyscale-50">
        {T("payment.form.workItems.addOtherPR.label")}
      </div>
      <div className="flex flex-row gap-2 items-top">
        <Input
          name={INPUT_NAME}
          placeholder={T("payment.form.workItems.addOtherPR.placeholder")}
          withMargin={false}
          options={{
            pattern: {
              value: REGEX_VALID_GITHUB_PULL_REQUEST_URL,
              message: T("payment.form.workItems.addOtherPR.notALink"),
            },
          }}
        />
        <div className="-mt-0.5" onClick={validateOtherPR} data-testid="add-other-pr-btn">
          <Button
            size={ButtonSize.LgLowHeight}
            type={ButtonType.Secondary}
            disabled={!otherPrLink || !!otherPrLinkError}
          >
            {T("payment.form.workItems.addOtherPR.add")}
          </Button>
        </div>
      </div>
    </div>
  );
}

const FETCH_PR_DETAILS = gql`
  ${IssueDetailsFragmentDoc}
  query fetchPullRequest($repoOwner: String!, $repoName: String!, $prNumber: Int!) {
    fetchPullRequest(repoOwner: $repoOwner, repoName: $repoName, prNumber: $prNumber) {
      ...IssueDetails
    }
  }
`;
