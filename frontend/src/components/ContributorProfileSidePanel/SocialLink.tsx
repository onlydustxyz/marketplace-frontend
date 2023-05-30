import { linkClickHandlerFactory } from "src/utils/clickHandler";

interface LinkProps extends React.PropsWithChildren {
  link: string;
}

export default function SocialLink({ link, children }: LinkProps) {
  return (
    <div className="rounded-xl bg-white/4 backdrop-blur-lg" onClick={linkClickHandlerFactory(link)}>
      <div className="bg-noise-light w-10 h-10 text-2xl flex flex-row items-center justify-center rounded-xl hover:opacity-60  text-greyscale-200 hover:cursor-pointer">
        {children}
      </div>
    </div>
  );
}
