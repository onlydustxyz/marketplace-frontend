interface CheckMarkProps {
  className?: string;
  size?: number;
}

export default function CheckMark({ className }: CheckMarkProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg height="100%" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7482 0.966117C12.083 1.30094 12.083 1.84201 11.7482 2.17683L4.89107 9.03398C4.55625 9.3688 4.01518 9.3688 3.68036 9.03398L0.251036 5.6054C-0.0836786 5.27058 -0.0836786 4.72951 0.251036 4.39469C0.585804 4.05987 1.12848 4.05987 1.4633 4.39469L4.26161 7.21523L10.5375 0.966117C10.8723 0.63076 11.4134 0.63076 11.7482 0.966117Z" />
      </svg>
    </div>
  );
}
