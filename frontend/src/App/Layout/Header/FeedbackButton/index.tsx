import { gql } from "@apollo/client";
import { SliderButton } from "@typeform/embed-react";
import classNames from "classnames";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import DiscussLine from "src/icons/DiscussLine";
import { useUserIdentityQuery } from "src/__generated/graphql";

export default function FeedbackButton() {
  const { isLoggedIn, user } = useAuth();
  const { T } = useIntl();

  const getUserIdentityQuery = useUserIdentityQuery({
    skip: !isLoggedIn,
    fetchPolicy: "network-only",
    variables: { userId: user?.id },
  });

  const userPayoutInfo = getUserIdentityQuery.data?.userPayoutInfo;
  const identity = userPayoutInfo && userPayoutInfo.length > 0 ? userPayoutInfo[0].identity?.Person : undefined;

  return (
    <>
      {user && (
        <SliderButton
          id="CQcFnolD"
          iframeProps={{ title: T("navbar.feedback.popupTitle") }}
          opacity={100}
          position="right"
          autoClose={true}
          hidden={{
            firstname: identity?.firstname || "",
            lastname: identity?.lastname || "",
            email: user.email,
            github: user.login,
          }}
          transitiveSearchParams={true}
        >
          <div
            className={classNames(
              "flex flex-row justify-center items-center gap-2 rounded-xl font-walsheim",
              "drop-shadow-bottom-sm font-medium hover:shadow-none w-fit",
              "text-sm px-4 py-2 h-8 bg-white/8 backdrop-blur-lg border border-white/0",
              "text-greyscale-50",
              "hover:text-spacePurple-400 hover:bg-spacePurple-900 hover:border-spacePurple-400"
            )}
          >
            <DiscussLine />
            <span>{T("navbar.feedback.button")}</span>
          </div>
        </SliderButton>
      )}
    </>
  );
}

gql`
  query UserIdentity($userId: uuid!) {
    userPayoutInfo(where: { userId: { _eq: $userId } }) {
      userId
      identity
    }
  }
`;
