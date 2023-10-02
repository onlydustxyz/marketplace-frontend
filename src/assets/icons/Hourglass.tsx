export default function Hourglass({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
    >
      <path d="M2 1H10V3.22997L6.7683 6L10 8.77005V11H2V8.77005L5.2317 6L2 3.22997V1ZM8.14835 3.5L9 2.77004V2H3V2.77004L3.85163 3.5H8.14835ZM6 6.65855L3 9.22995V10H3.5L6 8.5L8.5 10H9V9.22995L6 6.65855Z" />
    </svg>
  );
}
