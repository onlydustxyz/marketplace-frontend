import { Typo } from "components/atoms/typo";
import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";

export default function ApplicationsPage() {
  return (
    <>
      <PosthogOnMount eventName={"my_applications_list_viewed"} />
      <div className="mx-auto w-full px-2 sm:px-8">
        <div className="flex flex-col gap-10 py-8">
          <Typo as={"h1"} variant={"brand"} size={"2xl"} translate={{ token: "v2.pages.applications.table.title" }} />
        </div>
      </div>
    </>
  );
}
