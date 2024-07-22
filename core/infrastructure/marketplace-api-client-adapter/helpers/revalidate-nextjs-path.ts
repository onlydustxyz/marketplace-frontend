"use server";

import { revalidatePath } from "next/cache";

export async function revalidateNextJsPath(
  path: Parameters<typeof revalidatePath>[0],
  type: Parameters<typeof revalidatePath>[1]
) {
  revalidatePath(path, type);
}
