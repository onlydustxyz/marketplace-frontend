export default function SkeletonHeader() {
  return (
    <div className="relative w-full">
      <svg
        className="relative w-full animate-pulse"
        viewBox="0 0 1440 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2_76)">
          <path d="M1440 0H0V76H1440V0Z" fill="black" />
          <path
            d="M44 58C55.0457 58 64 49.0457 64 38C64 26.9543 55.0457 18 44 18C32.9543 18 24 26.9543 24 38C24 49.0457 32.9543 58 44 58Z"
            fill="#171D44"
          />
          <path
            d="M174 26H88C81.3726 26 76 31.3726 76 38C76 44.6274 81.3726 50 88 50H174C180.627 50 186 44.6274 186 38C186 31.3726 180.627 26 174 26Z"
            fill="#171D44"
          />
          <path
            d="M1394 16H1311C1298.85 16 1289 25.8497 1289 38C1289 50.1503 1298.85 60 1311 60H1394C1406.15 60 1416 50.1503 1416 38C1416 25.8497 1406.15 16 1394 16Z"
            fill="#171D44"
          />
        </g>
        <defs>
          <clipPath id="clip0_2_76">
            <rect width="1440" height="76" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
