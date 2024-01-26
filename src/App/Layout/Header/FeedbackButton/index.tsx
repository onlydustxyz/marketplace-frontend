import { SliderButton } from "@typeform/embed-react";
import { useIntl } from "src/hooks/useIntl";
import DiscussLine from "src/icons/DiscussLine";
import MeApi from "src/api/me";
import { ReactNode, Ref, forwardRef, useMemo } from "react";
import { useCurrentUser } from "hooks/users/useCurrentUser";

export const FeedbackButton = forwardRef(function FeedbackButton(
  { customButton }: { customButton?: ReactNode },
  ref: Ref<unknown>
) {
  const { user } = useCurrentUser();
  const { T } = useIntl();

  const { data } = MeApi.queries.useGetMyPayoutInfo({});

  const { firstname, lastname } = useMemo(() => {
    if (data?.isCompany) {
      return {
        firstname: data?.company?.owner?.firstname || "",
        lastname: data?.company?.owner?.lastname || "",
      };
    }

    return {
      firstname: data?.person?.firstname || "",
      lastname: data?.person?.lastname || "",
    };
  }, [data]);

  return (
    <>
      {user && (
        <SliderButton
          ref={ref}
          id="CQcFnolD"
          iframeProps={{ title: T("navbar.feedback.popupTitle") }}
          opacity={100}
          position="right"
          hidden={{
            firstname,
            lastname,
            email: user.email || "",
            github: user.login || "",
          }}
          autoClose
          transitiveSearchParams
        >
          {customButton ? (
            customButton
          ) : (
            <div className="flex h-8 w-fit flex-row items-center justify-center gap-2 rounded-xl border border-greyscale-50 bg-white/5 px-4 py-2 font-walsheim text-sm font-medium text-greyscale-50 drop-shadow-bottom-sm hover:border-spacePurple-200 hover:text-spacePurple-100 hover:shadow-none">
              <DiscussLine />
              <span>{T("navbar.feedback.button")}</span>
            </div>
          )}
        </SliderButton>
      )}
    </>
  );
});

export default FeedbackButton;
