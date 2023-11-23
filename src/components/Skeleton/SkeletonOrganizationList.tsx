export default function SkeletonOrganizationList() {
  return (
    <div className="bg-red relative w-full">
      <svg
        viewBox="0 0 552 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full animate-pulse"
      >
        <g filter="url(#filter0_d_14027_56551)">
          <rect x="0" width="552" height="56" rx="12" fill="white" fillOpacity="0.02" shapeRendering="crispEdges" />
          <rect
            x="0.5"
            y="0.5"
            width="551"
            height="55"
            rx="11.5"
            stroke="#F3F0EE"
            strokeOpacity="0.08"
            shapeRendering="crispEdges"
          />
          <rect x="16" y="16" width="464" height="24" rx="12" fill="#171D44" />
          <rect x="504" y="16" width="32" height="24" rx="12" fill="#171D44" />
        </g>
        <defs>
          <filter
            id="filter0_d_14027_56551"
            x="0"
            y="0"
            width="552"
            height="184"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="32" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_14027_56551" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_14027_56551" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
