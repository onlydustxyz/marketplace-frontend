import type { Metadata } from "next";
import { sharedMetadata } from "../shared-metadata.ts";

export async function generateMetadata(props: { params: { slug: string[] } }): Promise<Metadata> {
  console.log("layout on (page) : params", props);

  return sharedMetadata;
}

export default function GenericLayout({ children }: { children: React.ReactNode }) {
  return children;
}
