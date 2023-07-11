import atomLogo from "assets/img/atom.png";

export default function Loader() {
  return (
    <div className="flex h-[calc(100dvh)] flex-grow flex-col items-center justify-center text-center md:h-full">
      <div className="w-24 animate-spin-medium">
        <img src={atomLogo}></img>
      </div>
    </div>
  );
}
