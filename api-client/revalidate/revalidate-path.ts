"use server";

import { revalidatePath } from "next/cache";

export default async function RevalidatePath({ path, type }: { path: string; type: "layout" | "page" }) {
  revalidatePath(path, type);
}
