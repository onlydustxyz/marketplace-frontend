import { SettingsHeader } from "../components/settings-header/settings-header";
import { ProfileForm } from "./features/form/form";
import { ProfileGithubAccount } from "./features/github-account/github-account";

// TODO: Add zod
export default function ProfilePage() {
  return (
    <>
      <SettingsHeader
        title="v2.pages.settings.publicProfile.title"
        subtitle="v2.pages.settings.publicProfile.subtitle"
      />
      <ProfileGithubAccount />

      <ProfileForm />
    </>
  );
}
