export function ContributionTableSkeleton() {
  return (
    <div className="w-full">
      <div className="sm:hidden">
        <Mobile />
      </div>

      <div className="hidden sm:block lg:hidden">
        <Tablet />
      </div>

      <div className="hidden lg:block">
        <Desktop />
      </div>
    </div>
  );
}

function Desktop() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1328 256" fill="none" className="w-full animate-pulse">
      <g clipPath="url(#clip0_1_323)">
        <rect width="1328" height="256" fill="#0E0D2E" rx="16" />
        <rect width="44" height="44" x="24" y="16" fill="#171D44" rx="8" />
        <rect width="40" height="16" x="80" y="18" fill="#171D44" rx="8" />
        <rect width="456" height="16" x="80" y="42" fill="#171D44" rx="8" />
        <path fill="#171D44" d="M1328 75H0v2h1328v-2Z" mask="url(#path-2-inside-1_1_323)" />
        <rect width="52" height="16" x="24" y="100" fill="#171D44" rx="8" />
        <rect width="166" height="16" x="162" y="100" fill="#171D44" rx="8" />
        <rect width="154" height="16" x="470" y="100" fill="#171D44" rx="8" />
        <rect width="90" height="16" x="1214" y="100" fill="#171D44" rx="8" />
        <path fill="#171D44" d="M1304 123H24v2h1280v-2Z" mask="url(#path-7-inside-2_1_323)" />
        <g fill="#171D44" filter="url(#filter0_bd_1_323)">
          <rect width="40" height="16" x="24" y="142" rx="8" />
          <rect width="140" height="16" x="162" y="142" rx="8" />
          <rect width="494" height="16" x="470" y="142" rx="8" />
          <rect width="20" height="16" x="1284" y="142" rx="8" />
          <path d="M1304 167H24v2h1280v-2Z" mask="url(#path-13-inside-3_1_323)" />
        </g>
        <g fill="#171D44" filter="url(#filter1_bd_1_323)">
          <rect width="40" height="16" x="24" y="178" rx="8" />
          <rect width="182" height="16" x="162" y="178" rx="8" />
          <rect width="354" height="16" x="470" y="178" rx="8" />
          <rect width="20" height="16" x="1284" y="178" rx="8" />
          <path d="M1304 203H24v2h1280v-2Z" mask="url(#path-19-inside-4_1_323)" />
        </g>
        <g fill="#171D44" filter="url(#filter2_bd_1_323)">
          <rect width="40" height="16" x="24" y="214" rx="8" />
          <rect width="156" height="16" x="162" y="214" rx="8" />
          <rect width="429" height="16" x="470" y="214" rx="8" />
          <rect width="20" height="16" x="1284" y="214" rx="8" />
          <path d="M1304 239H24v2h1280v-2Z" mask="url(#path-25-inside-5_1_323)" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_bd_1_323"
          width="1344"
          height="108"
          x="-8"
          y="100"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_323" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_1_323" result="effect2_dropShadow_1_323" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_323" result="shape" />
        </filter>
        <filter
          id="filter1_bd_1_323"
          width="1344"
          height="108"
          x="-8"
          y="136"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_323" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_1_323" result="effect2_dropShadow_1_323" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_323" result="shape" />
        </filter>
        <filter
          id="filter2_bd_1_323"
          width="1344"
          height="108"
          x="-8"
          y="172"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_323" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_1_323" result="effect2_dropShadow_1_323" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_1_323" result="shape" />
        </filter>
        <clipPath id="clip0_1_323">
          <rect width="1328" height="256" fill="#fff" rx="16" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Tablet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 736 352" fill="none" className="w-full animate-pulse">
      <g clipPath="url(#clip0_5_2276)">
        <mask id="path-3-inside-1_5_2276" fill="#fff">
          <path d="M0 0h736v104H0V0Z" />
        </mask>
        <path fill="#0E0D2E" d="M0 0h736v104H0V0Z" />
        <rect width="44" height="44" x="24" y="16" fill="#171D44" rx="8" />
        <rect width="120" height="16" x="80" y="16" fill="#171D44" rx="8" />
        <rect width="632" height="12" x="80" y="44" fill="#171D44" rx="6" />
        <rect width="209" height="12" x="80" y="60" fill="#171D44" rx="6" />
        <rect width="64" height="12" x="80" y="76" fill="#171D44" rx="6" />
        <path fill="#171D44" d="M736 103H0v2h736v-2Z" mask="url(#path-3-inside-1_5_2276)" />
        <g filter="url(#filter0_bd_5_2276)">
          <rect width="712" height="108" x="12" y="116" fill="#0E0D2E" rx="12" />
          <rect width="26" height="26" x="27" y="131" fill="#171D44" rx="9" />
          <rect width="26" height="26" x="27" y="131" stroke="#171D44" strokeWidth="2" rx="9" />
          <rect width="91" height="16" x="60" y="136" fill="#171D44" rx="8" />
          <rect width="40" height="20" x="28" y="164" fill="#171D44" rx="10" />
          <rect width="220" height="16" x="72" y="166" fill="#171D44" rx="8" />
          <rect width="16" height="16" x="28" y="192" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="48" y="194" fill="#171D44" rx="6" />
          <rect width="16" height="16" x="100" y="192" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="120" y="194" fill="#171D44" rx="6" />
        </g>
        <g filter="url(#filter1_bd_5_2276)">
          <rect width="712" height="108" x="12" y="232" fill="#0E0D2E" rx="12" />
          <rect width="26" height="26" x="27" y="247" fill="#171D44" rx="9" />
          <rect width="26" height="26" x="27" y="247" stroke="#171D44" strokeWidth="2" rx="9" />
          <rect width="91" height="16" x="60" y="252" fill="#171D44" rx="8" />
          <rect width="40" height="20" x="28" y="280" fill="#171D44" rx="10" />
          <rect width="220" height="16" x="72" y="282" fill="#171D44" rx="8" />
          <rect width="16" height="16" x="28" y="308" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="48" y="310" fill="#171D44" rx="6" />
          <rect width="16" height="16" x="100" y="308" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="120" y="310" fill="#171D44" rx="6" />
        </g>
      </g>
      <rect width="735" height="351" x=".5" y=".5" stroke="#171D44" rx="15.5" />
      <defs>
        <filter
          id="filter0_bd_5_2276"
          width="776"
          height="180"
          x="-20"
          y="84"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5_2276" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_5_2276" result="effect2_dropShadow_5_2276" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_5_2276" result="shape" />
        </filter>
        <filter
          id="filter1_bd_5_2276"
          width="776"
          height="180"
          x="-20"
          y="200"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5_2276" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_5_2276" result="effect2_dropShadow_5_2276" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_5_2276" result="shape" />
        </filter>
        <clipPath id="clip0_5_2276">
          <rect width="736" height="352" fill="#fff" rx="16" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Mobile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 343 352" fill="none" className="w-full animate-pulse">
      <g clipPath="url(#clip0_4_2196)">
        <mask id="path-3-inside-1_4_2196" fill="#fff">
          <path d="M0 0h343v104H0V0Z" />
        </mask>
        <path fill="#0E0D2E" d="M0 0h343v104H0V0Z" />
        <rect width="44" height="44" x="24" y="16" fill="#171D44" rx="8" />
        <rect width="120" height="16" x="80" y="16" fill="#171D44" rx="8" />
        <rect width="239" height="12" x="80" y="44" fill="#171D44" rx="6" />
        <rect width="209" height="12" x="80" y="60" fill="#171D44" rx="6" />
        <rect width="64" height="12" x="80" y="76" fill="#171D44" rx="6" />
        <path fill="#171D44" d="M343 103H0v2h343v-2Z" mask="url(#path-3-inside-1_4_2196)" />
        <g filter="url(#filter0_bd_4_2196)">
          <rect width="319" height="108" x="12" y="116" fill="#0E0D2E" rx="12" />
          <rect width="26" height="26" x="27" y="131" fill="#171D44" rx="9" />
          <rect width="26" height="26" x="27" y="131" stroke="#171D44" strokeWidth="2" rx="9" />
          <rect width="91" height="16" x="60" y="136" fill="#171D44" rx="8" />
          <rect width="40" height="20" x="28" y="164" fill="#171D44" rx="10" />
          <rect width="220" height="16" x="72" y="166" fill="#171D44" rx="8" />
          <rect width="16" height="16" x="28" y="192" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="48" y="194" fill="#171D44" rx="6" />
          <rect width="16" height="16" x="100" y="192" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="120" y="194" fill="#171D44" rx="6" />
        </g>
        <g filter="url(#filter1_bd_4_2196)">
          <rect width="319" height="108" x="12" y="232" fill="#0E0D2E" rx="12" />
          <rect width="26" height="26" x="27" y="247" fill="#171D44" rx="9" />
          <rect width="26" height="26" x="27" y="247" stroke="#171D44" strokeWidth="2" rx="9" />
          <rect width="91" height="16" x="60" y="252" fill="#171D44" rx="8" />
          <rect width="40" height="20" x="28" y="280" fill="#171D44" rx="10" />
          <rect width="220" height="16" x="72" y="282" fill="#171D44" rx="8" />
          <rect width="16" height="16" x="28" y="308" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="48" y="310" fill="#171D44" rx="6" />
          <rect width="16" height="16" x="100" y="308" fill="#171D44" rx="8" />
          <rect width="40" height="12" x="120" y="310" fill="#171D44" rx="6" />
        </g>
      </g>
      <rect width="342" height="351" x=".5" y=".5" stroke="#171D44" rx="15.5" />
      <defs>
        <filter
          id="filter0_bd_4_2196"
          width="383"
          height="180"
          x="-20"
          y="84"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4_2196" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_4_2196" result="effect2_dropShadow_4_2196" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_4_2196" result="shape" />
        </filter>
        <filter
          id="filter1_bd_4_2196"
          width="383"
          height="180"
          x="-20"
          y="200"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="16" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4_2196" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
          <feBlend in2="effect1_backgroundBlur_4_2196" result="effect2_dropShadow_4_2196" />
          <feBlend in="SourceGraphic" in2="effect2_dropShadow_4_2196" result="shape" />
        </filter>
        <clipPath id="clip0_4_2196">
          <rect width="343" height="352" fill="#fff" rx="16" />
        </clipPath>
      </defs>
    </svg>
  );
}
