import { Flex } from "components/layout/flex/flex";

import { FormContact } from "./contact/contact";
import { FormInformations } from "./informations/informations";
import { FormTechnologies } from "./technologies/technologies";
import { FormWeeklyAllocatedTime } from "./weekly-allocated-time/weekly-allocated-time";

export function ProfileForm() {
  return (
    <Flex direction="col" className="gap-4">
      <FormInformations />
      <FormContact />
      <FormTechnologies />
      <FormWeeklyAllocatedTime />
    </Flex>
  );
}
