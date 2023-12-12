import { useMemo } from "react";
import { useIntl } from "src/hooks/useIntl";
import { useLoginUrl } from "src/hooks/useLoginUrl/useLoginUrl";
import GithubLogo, { Size } from "src/icons/GithubLogo";
import { cn } from "src/utils/cn";

const VARIANT_DEFAULT = "default";
const VARIANT_GREY_NOISE = "greyNoise";

type Variant = typeof VARIANT_DEFAULT | typeof VARIANT_GREY_NOISE;

export default function GithubLink({
  onClick,
  variant = VARIANT_DEFAULT,
}: {
  onClick?: () => void;
  variant?: Variant;
}) {
  const { T } = useIntl();
  const getLoginUrl = useLoginUrl();
  const login_url = useMemo(() => getLoginUrl(window.location.origin), []);

  return (
    <a className="z-10" href={login_url} onClick={onClick} data-testid="github-signin-button">
      <div className="m-px w-fit overflow-hidden rounded-full p-px blur-0 transition duration-300 hover:m-0 hover:p-0.5">
        <div
          className={cn(
            "relative flex w-fit items-center justify-center rounded-full before:absolute before:-z-10 before:h-[calc(100dvh)] before:w-screen before:bg-multi-color-gradient hover:before:animate-spin-invert-slow",
            {
              "bg-black hover:bg-spacePurple-900": variant === VARIANT_DEFAULT,
              "bg-greyscale-900": variant === VARIANT_GREY_NOISE,
            }
          )}
        >
          <div
            className={cn("flex w-fit flex-row items-center gap-2 px-2 py-0.5", {
              "bg-white/4 bg-noise-medium": variant === VARIANT_GREY_NOISE,
            })}
          >
            <GithubLogo size={Size.Large} />
            <div className="mr-1 flex font-belwe">{T("navbar.signInWithGithub")}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
