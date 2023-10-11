import { SpinningLogo } from "src/components/Loader/SpinningLogo";

export default function Loader() {
  return (
    <div className="flex h-[calc(100dvh)] flex-grow flex-col items-center justify-center text-center md:h-full">
      <SpinningLogo />
    </div>
  );
}
