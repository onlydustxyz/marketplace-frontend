export const StackDrop = ({ onClick }: { onClick: () => void }) => {
  return (
    // <div onClick={onClick} className="absolute -left-[50px] top-0 h-screen w-[50px] bg-green-500 opacity-25"></div>
    <div onClick={onClick} className="absolute -left-[50px] top-0 h-screen w-[50px] bg-black/40 backdrop-blur-sm"></div>
  );
};
