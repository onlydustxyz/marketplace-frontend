interface TelegramProps {
  className: string;
  size?: number;
}

export default function Telegram({ className, size = 24 }: TelegramProps) {
  return (
    <svg
      className={className ? className : "fill-greyscale-400"}
      width={size}
      height={size}
      viewBox="0 0 17 15"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M4.54603 8.54583L0.761079 7.36549C-0.0571259 7.11549 -0.0616717 6.55183 0.944417 6.14728L15.6918 0.450148C16.5479 0.101653 17.0327 0.542574 16.7555 1.64715L14.2448 13.496C14.069 14.3399 13.5614 14.5415 12.8569 14.152L8.99161 11.2914L7.19005 13.0308C7.00519 13.2096 6.85519 13.3626 6.57033 13.4005C6.28699 13.4399 6.05365 13.3551 5.88243 12.8853L4.56422 8.53522L4.54603 8.54583Z" />
    </svg>
  );
}
