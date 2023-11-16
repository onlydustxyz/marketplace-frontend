import { cn } from "src/utils/cn";

const variants = {
  purple: "text-spacePurple-500",
  greyscale: "text-greyscale-50",
};

export function Spinner({ className, variant = "purple" }: { className?: string; variant?: keyof typeof variants }) {
  return (
    <svg
      className={cn("h-6 w-6 animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="text-greyscale-50/20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className={variants[variant]}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
