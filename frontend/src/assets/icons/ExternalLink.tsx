interface Props {
  className?: string;
}

export default function ExternalLink({ className }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg height="100%" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.66667 2V3.33333H1.33333V10.6667H8.66667V7.33333H10V11.3333C10 11.5101 9.92976 11.6797 9.80474 11.8047C9.67971 11.9298 9.51014 12 9.33333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V2.66667C0 2.48986 0.0702379 2.32029 0.195262 2.19526C0.320286 2.07024 0.489856 2 0.666667 2H4.66667ZM12 0V5.33333H10.6667V2.27533L5.47133 7.47133L4.52867 6.52867L9.72333 1.33333H6.66667V0H12Z" />
      </svg>
    </div>
  );
}
