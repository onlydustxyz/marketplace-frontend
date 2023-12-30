"use server";

import { revalidateTag } from "next/cache";
import { ProjectsActions } from "../../../actions/Projects/projects.actions.ts";

export async function handleNextPage() {
  console.log("next page server");

  revalidateTag(ProjectsActions.tags.list);
}
