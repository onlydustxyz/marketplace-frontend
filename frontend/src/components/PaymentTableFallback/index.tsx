import { Link } from "react-router-dom";
import { RoutePaths } from "src/App";
import foxLogo from "assets/img/fox.png";
import { useT } from "talkr";

export default function PaymentTableFallback() {
  const { T } = useT();
  return (
    <div className="flex flex-col items-center gap-10 p-4">
      <div className="w-64">
        <img src={foxLogo}></img>
      </div>
      <div className="flex flex-col text-lg items-center gap-2">
        <div>{T("payment.tableFallback.noPayments")}</div>
        <div>{T("payment.tableFallback.contribute")}</div>
      </div>
      <div className="bg-neutral-50 rounded-xl p-8">
        <Link to={RoutePaths.Projects}>
          <div className="text-3xl text-black">{T("payment.tableFallback.browseProjects")}</div>
        </Link>
      </div>
    </div>
  );
}
