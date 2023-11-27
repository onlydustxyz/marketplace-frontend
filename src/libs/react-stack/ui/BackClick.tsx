export const BackClick = ({ onClick }: { onClick: () => void }) => {
  return <div onClick={onClick} className="absolute -left-[40px] top-0 z-20 h-screen w-[40px] "></div>;
};
