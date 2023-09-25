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

  const { lastname, firstname } = getUserIdentityQuery.data?.userPayoutInfo[0] || {};

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
            firstname: firstname || "",
            lastname: lastname || "",
            email: user.email,
            github: user.login,
          }}
          transitiveSearchParams={true}
        >
          <div
            className={classNames(
              "flex flex-row items-center justify-center gap-2 rounded-xl font-walsheim",
              "w-fit font-medium drop-shadow-bottom-sm hover:shadow-none",
              "h-8 border border-greyscale-50 bg-white/5 px-4 py-2 text-sm text-greyscale-50",
              "hover:border-spacePurple-200 hover:text-spacePurple-100"
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
