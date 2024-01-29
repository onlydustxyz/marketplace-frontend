interface TelegramProps {
  className?: string;
  size?: number;
}

export default function Telegram({ className, size = 24 }: TelegramProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.65524 13.8549L2.11329 12.4385C1.13145 12.1385 1.12599 11.4622 2.3333 10.9767L20.0302 4.14013C21.0575 3.72194 21.6393 4.25104 21.3066 5.57653L18.2937 19.7951C18.0828 20.8079 17.4737 21.0497 16.6282 20.5824L11.9899 17.1496L9.82806 19.2369C9.60623 19.4515 9.42622 19.6351 9.0844 19.6806C8.74439 19.7278 8.46438 19.626 8.25892 19.0624L6.67706 13.8422L6.65524 13.8549Z"
        fill="currentColor"
      />
    </svg>
  );
}
