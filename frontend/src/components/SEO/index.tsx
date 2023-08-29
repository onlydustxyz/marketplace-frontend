import { Helmet } from "react-helmet";
import config from "src/config";

type Props = {
  title?: string;
  description?: string;
  route?: string;
};

const DEFAULT_TITLE = "Only Dust — Forge your developer legacy";
export default function SEO({ title = DEFAULT_TITLE }: Props) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
