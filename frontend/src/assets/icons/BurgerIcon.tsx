type Props = {
  className?: string;
};

export default function BurgerIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="menu-line 1">
        <path
          id="Vector"
          d="M2 2.66667H14V4.00001H2V2.66667ZM2 7.33334H14V8.66667H2V7.33334ZM2 12H14V13.3333H2V12Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
