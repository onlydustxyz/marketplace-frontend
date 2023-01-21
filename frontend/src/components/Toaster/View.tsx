import CheckLine from "src/icons/CheckLine";
import ErrorWarningLine from "src/icons/ErrorWarningLine";

interface Props {
  message: string;
  visible: boolean;
  isError: boolean;
  className?: string;
}

export default function View({ message, visible, isError, className }: Props) {
  return (
    <div
      data-testid="toaster-message"
      className={`${
        visible ? "opacity-100" : "opacity-0"
      } absolute rounded-2xl p-0.5 overflow-hidden transition duration-300 ${className}`}
    >
      <div
        className={`relative flex justify-center items-center bg-black rounded-2xl before:absolute before:-z-10 before:h-screen before:w-screen ${
          isError ? "before:bg-orange-500" : "before:bg-multi-color-gradient before:animate-spin-invert-slow"
        }`}
      >
        <div className="rounded-2xl bg-noise-medium bg-white/4 flex items-center text-center w-fit max-w-xl p-6 gap-2">
          {isError ? (
            <ErrorWarningLine className="font-semibold text-2xl text-orange-500" />
          ) : (
            <CheckLine className="font-semibold text-2xl" />
          )}
          <span className="font-walsheim font-semibold text-lg">{message}</span>
        </div>
      </div>
    </div>
  );
}
