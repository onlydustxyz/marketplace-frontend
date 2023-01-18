import CheckLine from "src/icons/CheckLine";

interface Props {
  message?: string;
  className?: string;
}

export default function View({ message, className }: Props) {
  return (
    <div
      data-testid="toaster-message"
      className={`${message ? "visible" : "invisible"} rounded-2xl p-0.5 bg-multi-color-gradient w-fit ${className}`}
    >
      <div className={"flex items-center p-6 gap-2 bg-chineseBlack backdrop-blur-xl rounded-2xl"}>
        <CheckLine className="font-semibold text-2xl" />
        <span className="font-walsheim font-semibold text-lg">{message}</span>
      </div>
    </div>
  );
}
