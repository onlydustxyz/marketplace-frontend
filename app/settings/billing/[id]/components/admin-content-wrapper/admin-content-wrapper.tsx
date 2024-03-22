import { BillingProfilesTypes } from "src/api/BillingProfiles/type";

import { TAdminContentWrapper } from "./admin-content-wrapper.types";

export function AdminContentWrapper({ role, children }: TAdminContentWrapper.Props) {
  if (role === BillingProfilesTypes.ROLE.ADMIN) {
    return <div>{children}</div>;
  }

  return null;
}
