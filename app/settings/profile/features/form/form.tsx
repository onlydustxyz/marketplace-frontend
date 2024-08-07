import { ContactEmail } from "app/settings/profile/features/form/contact-email/contact-email";
import { FormContact } from "app/settings/profile/features/form/contact/contact";
import { FormInformations } from "app/settings/profile/features/form/informations/informations";
import { NotificationSettings } from "app/settings/profile/features/form/notification-settings/notification-settings";
import { FormWeeklyAllocatedTime } from "app/settings/profile/features/form/weekly-allocated-time/weekly-allocated-time";

export function Form() {
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
