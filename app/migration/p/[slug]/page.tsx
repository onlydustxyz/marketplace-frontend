import React from "react";
import { ImageResponse } from "next/og";
import { ProjectImageMetadata } from "./components/image-metadata/image-metadata.tsx";
import { Metadata, ResolvingMetadata } from "next";
// export async function generateImageMetadata({ params }: { params: { id: string } }) {
//   console.log("params", params);
//   return new ImageResponse(
//     (
//       <ProjectImageMetadata
//         name="coucou"
//         description={"coucou description"}
//         imageUrl="https://avatars.githubusercontent.com/u/16590657"
//       />
//     ),
//     {
//       width: 1200,
//       height: 630,
//       // fonts: [
//       //   {
//       //     name: "Belwe",
//       //     data: await belwe,
//       //     style: "normal",
//       //     weight: 400,
//       //   },
//       //   {
//       //     name: "Walsheim",
//       //     data: await walsheim,
//       //     style: "normal",
//       //     weight: 400,
//       //   },
//       // ],
//     }
//   );
// }

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  console.log("params", params);

  // fetch data
  // const product = await fetch(`https://.../${id}`).then(res => res.json());

  return {
    title: "coucouc",
  };
}

function ProjectDetails() {
  return <div>ProjectDetails</div>;
}

export default ProjectDetails;
