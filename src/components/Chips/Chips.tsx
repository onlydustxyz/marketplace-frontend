import { cn } from "src/utils/cn";
import { Chip } from "src/components/Chip/Chip";

type ChipsProps = {
  className?: string;
  number: number | null;
  children: React.ReactElement[];
};

export function Chips({ children, number }: ChipsProps) {
  return (
    <div className="flex">
      {children.map((child, key) =>
        number && key >= number ? (
          <></>
        ) : (
          <div key={key} className={cn(key > 0 && "-ml-2", ` z-[${key + 1}]`)}>
            {child}
          </div>
        )
      )}
      {number && children.length > number && (
        <div className={cn("-ml-2", ` z-[${children.length - number + 1}]`)}>
          <Chip solid>
            <p className="font-walsheim text-[10px] font-bold text-white">+{children.length - number}</p>
          </Chip>
        </div>
      )}
    </div>
  );
}
