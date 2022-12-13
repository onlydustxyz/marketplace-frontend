import LoaderIcon from "src/assets/icons/Loader";

export default function Loader() {
  return (
    <div className="min-h-screen flex-grow flex flex-col items-center justify-center text-center">
      <LoaderIcon className="flex animate-spin place-items-center" size={100} />
    </div>
  );
}
