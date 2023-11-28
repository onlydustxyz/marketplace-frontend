export const BackDrop = ({ onClick }: { onClick: () => void }) => {
  return <div onClick={onClick} className="fixed left-0 top-0 h-screen w-screen"></div>;
};
