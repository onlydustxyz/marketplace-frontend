import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import foxImg from "src/assets/img/fox.png";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

export function NotFound() {
  const { T } = useIntl();

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} centeredContent>
      <img src={foxImg} className="max-w-xs" />
      <div className="mb-6 text-center font-belwe text-2xl xl:text-3xl">{T("notFound.text")}</div>
      <Link to={RoutePaths.Home}>
        <Button size={ButtonSize.Md}>{T("notFound.button")}</Button>
      </Link>
    </Background>
  );
}
