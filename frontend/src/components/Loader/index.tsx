import atomLogo from "assets/img/atom.png";

export default function Loader() {
  return (
    <div className="h-full flex-grow flex flex-col items-center justify-center text-center">
      <div className="w-24 animate-spin-medium">
        <img src={atomLogo}></img>
      </div>
    </div>
  );
}
