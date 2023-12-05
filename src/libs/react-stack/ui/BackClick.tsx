import { usePlacement } from "../hooks/usePlacement";

export const BackClick = ({ onClick }: { onClick: () => void }) => {
  const { placement } = usePlacement();
  if (placement === "bottom") {
    return <div onClick={onClick} className="absolute -top-[40px] left-0 z-20 h-[40px] w-screen cursor-pointer"></div>;
  }

  return <div onClick={onClick} className="absolute -left-[40px] top-0 z-20 h-screen w-[40px] cursor-pointer "></div>;
};
