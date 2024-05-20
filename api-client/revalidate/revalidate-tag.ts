"use server";

import { revalidateTag } from "next/cache";

export default async function RevalidateTag(tag: string) {
  revalidateTag(tag);
}
