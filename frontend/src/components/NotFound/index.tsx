import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import logo from "src/assets/img/onlydust-logo-white.svg";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";

export function NotFound() {
  const { T } = useIntl();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 bg-[url('src/assets/img/not-found.png')] bg-cover bg-center p-5">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <img src={logo} alt="OnlyDust logo" className="w-12" />
        <div className="font-belwe text-2xl sm:text-3xl">
          <div>{T("notFound.title1")}</div>
          <div>{T("notFound.title2")}</div>
        </div>
        <div className="font-walsheim text-base text-spaceBlue-200 sm:text-lg">{T("notFound.text")}</div>
      </div>
      <Link to={RoutePaths.Home}>
        <Button size={ButtonSize.Lg}>
          <ArrowLeftSLine className="text-xl" /> {T("notFound.button")}
        </Button>
      </Link>
    </div>
  );
}
