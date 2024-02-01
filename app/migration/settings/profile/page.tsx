import { ProfileForm } from "./features/form/form";
import { ProfileGithubAccount } from "./features/github-account/github-account";
import { ProfileHeader } from "./features/header/header";

// TODO: Change card padding when it's merge
// TODO: Unable email on public profile : always false for now
// TODO: Recreate FieldInput in new components to change icon colors and textarea
// TODO: Add zod
// TODO: Recreate FieldImage in new components
export default function ProfilePage() {
  return (
    <>
      <ProfileHeader />
      <ProfileGithubAccount />

      <ProfileForm />
    </>
  );
}
