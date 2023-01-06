interface LoaderProps {
  className?: string;
  size?: number;
}

export default function BackArrow({ className }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg height="100%" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.21865 4.99999L5.51865 8.29999L4.57598 9.24266L0.333313 4.99999L4.57598 0.757324L5.51865 1.69999L2.21865 4.99999Z" />
      </svg>
    </div>
  );
}
