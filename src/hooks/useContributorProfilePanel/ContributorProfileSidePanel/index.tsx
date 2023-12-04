import View from "./View";
import { useAuth } from "src/hooks/useAuth";
import useRestfulProfile from "src/hooks/useRestfulProfile/useRestfulProfile";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import ErrorState from "src/components/ErrorState";

type Props = {
  githubUserId: number;
  setOpen: (value: boolean) => void;
};

export default function ContributorProfileSidePanel({ githubUserId, setOpen }: Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { githubUserId: currentUserGithubId } = useAuth();
  const { data: restFulProfile, isError } = useRestfulProfile({ githubUserId });

  if (isError) {
    showToaster(T("profile.error.cantFetch"), { isError: true });
    return (
      <div className="m-4 mt-12">
        <ErrorState />
      </div>
    );
  }

  return restFulProfile ? (
    <View
      isOwn={currentUserGithubId === restFulProfile.githubUserId}
      restFulProfile={restFulProfile}
      setOpen={setOpen}
    />
  ) : null;
}
