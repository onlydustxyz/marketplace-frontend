export function ContributionDetailSkeleton() {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 900" fill="none" className="w-full animate-pulse">
      <path fill="#1E1E1E" d="M0 0h550v900H0z" />
      <path fill="#181818" d="M0 0h550v900H0z" />
      <rect width="120" height="24" x="24" y="36" fill="#313030" rx="12" />
      <rect width="40" height="24" x="24" y="96" fill="#313030" rx="12" />
      <rect width="502" height="16" x="24" y="128" fill="#313030" rx="8" />
      <rect width="374" height="16" x="24" y="152" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="200" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="200" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="224" fill="#313030" rx="8" />
      <rect width="217" height="16" x="48" y="224" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="248" fill="#313030" rx="8" />
      <rect width="172" height="16" x="48" y="248" fill="#313030" rx="8" />
      <path stroke="#F3F0EE" strokeOpacity=".12" d="M24 296h502" />
      <rect width="16" height="16" x="24" y="330" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="330" fill="#313030" rx="8" />
      <rect width="502" height="140" x="24" y="364" fill="#313030" rx="12" />
      <rect width="502" height="140" x="24" y="520" fill="#313030" rx="12" />
      <rect width="502" height="140" x="24" y="676" fill="#313030" rx="12" />
    </svg>
  );
}

function Tablet() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 864" fill="none" className="w-full animate-pulse">
      <path fill="#1E1E1E" d="M0 0h768v864H0z" />
      <path fill="#181818" d="M0 0h768v864H0z" />
      <rect width="120" height="24" x="24" y="36" fill="#313030" rx="12" />
      <rect width="40" height="24" x="24" y="96" fill="#313030" rx="12" />
      <rect width="720" height="16" x="24" y="128" fill="#313030" rx="8" />
      <rect width="294" height="16" x="24" y="152" fill="#313030" rx="8" />
      <rect width="250" height="16" x="24" y="176" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="216" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="216" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="240" fill="#313030" rx="8" />
      <rect width="217" height="16" x="48" y="240" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="264" fill="#313030" rx="8" />
      <rect width="172" height="16" x="48" y="264" fill="#313030" rx="8" />
      <path stroke="#F3F0EE" strokeOpacity=".12" d="M24 312h720" />
      <rect width="16" height="16" x="24" y="346" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="346" fill="#313030" rx="8" />
      <rect width="720" height="140" x="24" y="380" fill="#313030" rx="12" />
      <rect width="720" height="140" x="24" y="536" fill="#313030" rx="12" />
      <rect width="720" height="140" x="24" y="692" fill="#313030" rx="12" />
    </svg>
  );
}

function Mobile() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 832" fill="none" className="w-full animate-pulse">
      <path fill="#1E1E1E" d="M0 0h375v832H0z" />
      <path fill="#181818" d="M0 0h375v812H0z" />
      <rect width="120" height="24" x="24" y="36" fill="#313030" rx="12" />
      <rect width="40" height="24" x="24" y="96" fill="#313030" rx="12" />
      <rect width="327" height="16" x="24" y="128" fill="#313030" rx="8" />
      <rect width="294" height="16" x="24" y="152" fill="#313030" rx="8" />
      <rect width="250" height="16" x="24" y="176" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="216" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="216" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="240" fill="#313030" rx="8" />
      <rect width="217" height="16" x="48" y="240" fill="#313030" rx="8" />
      <rect width="16" height="16" x="24" y="264" fill="#313030" rx="8" />
      <rect width="172" height="16" x="48" y="264" fill="#313030" rx="8" />
      <path stroke="#F3F0EE" strokeOpacity=".12" d="M24 312h327" />
      <rect width="16" height="16" x="24" y="346" fill="#313030" rx="8" />
      <rect width="140" height="16" x="48" y="346" fill="#313030" rx="8" />
      <rect width="327" height="140" x="24" y="380" fill="#313030" rx="12" />
      <rect width="327" height="140" x="24" y="536" fill="#313030" rx="12" />
      <rect width="327" height="140" x="24" y="692" fill="#313030" rx="12" />
    </svg>
  );
}
