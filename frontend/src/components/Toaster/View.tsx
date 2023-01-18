import CheckLine from "src/icons/CheckLine";

interface Props {
  message?: string;
  className?: string;
}

export default function View({ message, className }: Props) {
  return (
    <div
      className={`${
        message ? "visible" : "invisible"
      } flex items-center p-6 gap-2 backdrop-blur-xl rounded-2xl border-2 w-fit ${className}`}
    >
      <>
        <CheckLine className="font-semibold text-2xl" />
        <span className="font-walsheim font-semibold text-lg">{message}</span>
      </>
    </div>
  );
}
