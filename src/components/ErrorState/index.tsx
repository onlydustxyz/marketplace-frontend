import { useIntl } from "src/hooks/useIntl";
import OnlyDustCrashedLogo from "src/assets/icons/OnlyDustCrashedLogo";

export default function ErrorState() {
  const { T } = useIntl();
  const [begin, link, end] = T("state.error.description").split("_");

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/2 p-12">
      <div className="mb-6">
        <OnlyDustCrashedLogo />
      </div>
      <div className="text-center font-belwe text-2xl font-normal text-greyscale-50">{T("state.error.title")}</div>
      <div className="text-center font-walsheim text-base font-normal text-greyscale-50">
        {begin}
        <a className="underline" href={"mailto:contact@onlydust.xyz"}>
          {link}
        </a>
        {end}
      </div>
    </div>
  );
}
