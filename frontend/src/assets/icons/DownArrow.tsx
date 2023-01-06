interface Props {
  className?: string;
}

export default function DownArrow({ className }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg height="100%" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66645 8.78117L10.2425 5.20517L11.1851 6.14784L5.99979 11.3332L0.814453 6.14784L1.75712 5.20517L5.33312 8.78117V0.666504H6.66645V8.78117Z" />
      </svg>
    </div>
  );
}
