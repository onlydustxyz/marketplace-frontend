import { ContactEmail } from "app/settings/profile/features/form/contact-email/contact-email";
import { NotificationSettings } from "app/settings/profile/features/form/notification-settings/notification-settings";

import { FormContact } from "./contact/contact";
import { FormInformations } from "./informations/informations";
import { FormWeeklyAllocatedTime } from "./weekly-allocated-time/weekly-allocated-time";

export function ProfileForm() {
  return (
    <>
      <ContactEmail />
      <NotificationSettings />
      <FormInformations />
      <FormContact />
      <FormWeeklyAllocatedTime />
    </>
  );
}
