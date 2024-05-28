import OpenGraphImage from "../features/opengraph-image";

export default async function Image(props: { params: { committeeId: string } }) {
  return OpenGraphImage(props);
}
