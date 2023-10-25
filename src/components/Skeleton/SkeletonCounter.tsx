export default function SkeletonCounter() {
  return (
    <div className="relative w-full">
      <svg
        className="relative w-full animate-pulse"
        viewBox="0 0 160 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3_16)">
          <rect width="160" height="36" rx="18" fill="#171D44" />
        </g>
        <defs>
          <clipPath id="clip0_3_16">
            <rect width="160" height="36" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
