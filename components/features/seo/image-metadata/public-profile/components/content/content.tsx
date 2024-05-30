import { ContentHighlight } from "components/features/seo/image-metadata/public-profile/components/content/content-highlight";
import { ContentLogo } from "components/features/seo/image-metadata/public-profile/components/content/content-logo";
import { ContentUser } from "components/features/seo/image-metadata/public-profile/components/content/content-user";
import { StackIcon } from "components/features/seo/image-metadata/public-profile/components/stack-icon";

interface Props {
  login: string;
  title: string;
  image: string;
  rank: number;
  rankPercentile: number;
  topLanguages?: {
    name: string;
    image: string;
  };
  topEcosystem?: {
    name: string;
    image: string;
  };
}
export function OgContent({ login, title, image, topLanguages, topEcosystem, rank, rankPercentile }: Props) {
  console.time("RENDER OgContent");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "48px",
      }}
    >
      <ContentLogo />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        <ContentUser image={image} login={login} title={title} rank={rank} rankPercentile={rankPercentile} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {topLanguages ? (
            <ContentHighlight
              name={topLanguages.name}
              image={topLanguages.image}
              icon={<StackIcon width={28} height={28} />}
              label="Top language"
            />
          ) : null}
          {topEcosystem ? (
            <ContentHighlight
              name={topEcosystem.name}
              image={topEcosystem.image}
              icon={<StackIcon width={28} height={28} />}
              label="Top ecosystem"
            />
          ) : null}
          <>{console.timeEnd("RENDER OgContent")}</>
        </div>
      </div>
    </div>
  );
}
