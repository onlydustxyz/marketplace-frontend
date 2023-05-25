import isDefined from "src/utils/isDefined";
import {
  GetUserPayoutSettingsDocument,
  useGetUserPayoutSettingsQuery,
  useUpdatePayoutSettingsMutation,
} from "src/__generated/graphql";
import { useShowToaster } from "src/hooks/useToaster";
import { useIntl } from "src/hooks/useIntl";

export default function usePayoutSettings(githubUserId?: number) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

  const query = useGetUserPayoutSettingsQuery({
    variables: { githubUserId },
    skip: !githubUserId,
    fetchPolicy: "network-only",
  });

  const userInfo = query.data?.registeredUsers.at(0)?.userInfo;
  const valid = query.data ? query.data.registeredUsers.at(0)?.userInfo?.arePayoutSettingsValid || false : undefined;
  const invoiceNeeded = isDefined(query.data?.registeredUsers.at(0)?.userInfo?.identity?.Company);

  const [updatePayoutSettings, { loading: updatePayoutSettingsLoading }] = useUpdatePayoutSettingsMutation({
    context: { graphqlErrorDisplay: "toaster" },
    onCompleted: () => showToaster(T("profile.form.success")),
    refetchQueries: [GetUserPayoutSettingsDocument],
  });

  return {
    ...query,
    data: userInfo,
    valid,
    invoiceNeeded,
    updatePayoutSettings,
    updatePayoutSettingsLoading,
  };
}
