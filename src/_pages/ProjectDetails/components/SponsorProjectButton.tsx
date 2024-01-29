import { FilloutStandardEmbed } from "@fillout/react";
import { Icon } from "components/layout/icon/icon";
import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useState } from "react";
import { components } from "src/__generated/api";
import MeApi from "src/api/me";
import { Channel } from "src/App/Stacks/ContributorProfileSidePanel/EditView/types";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";

interface Props {
  project: components["schemas"]["ProjectResponse"];
}

export function SponsorProjectButton({ project }: Props) {
  const { T } = useIntl();
  const { user } = useCurrentUser();
  const { data: userInfo } = MeApi.queries.useGetMyPayoutInfo({});
  const { data: userProfile } = MeApi.queries.useGetMyProfileInfo({});
  const [isOpen, setIsOpen] = useState(false);

  const findContact = (channel: Channel) => {
    const findContact = userProfile?.contacts?.find(contact => contact.channel === channel);
    return findContact?.contact || undefined;
  };

  console.log({ project, user, userInfo, userProfile });

  // Project
  //
  // Coordonnées de facturation
  //
  // Nom
  //
  // Addresse, Ville, Pays
  //
  // Currency
  //
  // Montant
  //
  // Origine des fonds: addresse from
  //
  // Network
  //
  // USD - Ethereum
  //
  // USDC - Ethereum

  return (
    <>
      <Button
        onBackground={ButtonOnBackground.Blue}
        className="flex-1 md:flex-initial"
        size={ButtonSize.Sm}
        onClick={() => setIsOpen(true)}
      >
        <Icon remixName="ri-service-line" />
        {T("project.sponsorButton.full")}
      </Button>

      <SidePanel open={isOpen} setOpen={setIsOpen}>
        <FilloutStandardEmbed
          filloutId="1cTn46XDDVus"
          inheritParameters
          parameters={
            {
              // lead_id: user?.id,
              // lead_first_name: userInfo?.person?.firstname,
              // lead_last_name: userInfo?.person?.lastname,
              // lead_github: user?.login,
              // lead_telegram: findContact(Channel.Telegram),
              // lead_email: findContact(Channel.Email),
              // project_id: project.id,
              // project_name: project.name,
            }
          }
        />
      </SidePanel>
    </>
  );
}
