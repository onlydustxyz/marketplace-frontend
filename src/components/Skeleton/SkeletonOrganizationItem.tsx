export default function SkeletonOrganizationItem() {
  return (
    <div className="relative w-full">
      <svg
        className="relative my-4 w-full animate-pulse rounded-2xl border border-greyscale-50/8 shadow-medium"
        viewBox="0 0 552 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_45_1090)">
          <rect width="552" height="56" rx="12" fill="#0E0D2E" />
          <rect x="15" y="12" width="32" height="32" rx="10" fill="#171D44" />
          <rect x="505" y="12" width="32" height="32" rx="10" fill="#171D44" />
          <rect x="66" y="22" width="90" height="11" rx="5.5" fill="#171D44" />
        </g>
        <defs>
          <clipPath id="clip0_45_1090">
            <rect width="552" height="56" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
