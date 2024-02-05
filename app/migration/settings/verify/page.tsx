import { SettingsHeader } from "app/migration/settings/components/settings-header/settings-header";

export default function VerifyPage() {
  return (
    <div>
      <SettingsHeader
        icon={"ri-suitcase-line"}
        title={"onboarding.intro.title"}
        subtitle={"onboarding.intro.description"}
      >
        testing
      </SettingsHeader>
    </div>
  );
}
