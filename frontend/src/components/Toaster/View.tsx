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
      className={`${visible ? "opacity-100" : "opacity-0"} rounded-2xl p-0.5 ${
        isError ? "bg-orange-500" : "bg-multi-color-gradient"
      } w-fit transition ${className}`}
    >
      <div className={"flex items-center p-6 gap-2 bg-chineseBlack backdrop-blur-xl rounded-2xl"}>
        {isError ? (
          <ErrorWarningLine className="font-semibold text-2xl text-orange-500" />
        ) : (
          <CheckLine className="font-semibold text-2xl" />
        )}
        <span className="font-walsheim font-semibold text-lg">{message}</span>
      </div>
    </div>
  );
}
