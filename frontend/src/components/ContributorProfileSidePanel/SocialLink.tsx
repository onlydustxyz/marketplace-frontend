import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { copyClickHandlerFactory, linkClickHandlerFactory } from "src/utils/clickHandler";

interface SocialLinkProps extends React.PropsWithChildren {
  link?: string;
  copyableValue?: string;
  copyableValueName?: string;
}

export default function SocialLink({ link, copyableValue, copyableValueName, children }: SocialLinkProps) {
  const showToaster = useShowToaster();
  const { T } = useIntl();

  return (
    <div
      className="rounded-xl bg-white/4 backdrop-blur-lg"
      onClick={
        link
          ? linkClickHandlerFactory(link)
          : copyClickHandlerFactory(copyableValue || "", () => {
              showToaster(T("profile.valueCopiedToClipboard", { valueName: copyableValueName }));
            })
      }
    >
      <div className="bg-noise-light w-10 h-10 text-2xl flex flex-row items-center justify-center rounded-xl hover:opacity-60  text-greyscale-200 hover:cursor-pointer">
        {children}
      </div>
    </div>
  );
}
