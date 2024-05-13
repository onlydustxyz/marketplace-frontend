import { ContentLogo } from "components/features/seo/image-metadata/public-profile/components/content/content-logo";
import { ContentUser } from "components/features/seo/image-metadata/public-profile/components/content/content-user";

interface Props {
  login: string;
  title: string;
  image: string;
}
export function OgContent({ login, title, image }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "30px",
      }}
    >
      <ContentLogo />
      <ContentUser image={image} login={login} title={title} />
      <p>coucou</p>
    </div>
  );
}
