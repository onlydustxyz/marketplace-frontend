type Props = {
  className?: string;
};

export default function Filter({ className }: Props) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="sound-module">
        <path
          id="Vector"
          d="M14 12V14H12.6667V12H11.3333V10H15.3333V12H14ZM3.33332 12V14H1.99999V12H0.666656V10H4.66666V12H3.33332ZM7.33332 4V2H8.66666V4H9.99999V6H5.99999V4H7.33332ZM7.33332 7.33333H8.66666V14H7.33332V7.33333ZM1.99999 8.66667V2H3.33332V8.66667H1.99999ZM12.6667 8.66667V2H14V8.66667H12.6667Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
