import { Helmet } from "react-helmet";
import config from "src/config";

type Props = {
  title?: string;
  description?: string;
  route?: string;
};

const DEFAULT_TITLE = "Only Dust — Forge your developer legacy";
const DEFAULT_DESCRIPTION =
  "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community. The stars are within your reach.";

export default function SEO({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, route }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="OnlyDust" />
      <meta property="og:url" content={`${config.ASSET_PATH}/${route}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://onlydust-app-images.s3.eu-west-1.amazonaws.com/thumbnail.png" />
      <meta property="og:image:alt" content={DEFAULT_DESCRIPTION} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@OnlyDust_xyz" />
    </Helmet>
  );
}
