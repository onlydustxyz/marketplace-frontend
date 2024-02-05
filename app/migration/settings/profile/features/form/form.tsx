import { FormContact } from "./contact/contact";
import { FormInformations } from "./informations/informations";
import { FormTechnologies } from "./technologies/technologies";
import { FormWeeklyAllocatedTime } from "./weekly-allocated-time/weekly-allocated-time";

export function ProfileForm() {
  return (
    <>
      <FormInformations />
      <FormContact />
      <FormTechnologies />
      <FormWeeklyAllocatedTime />
    </>
  );
}
