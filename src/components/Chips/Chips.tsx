import { Chip } from "src/components/Chip/Chip";
import { cn } from "src/utils/cn";

type ChipsProps = {
  className?: string;
  sizeClassName?: string;
  number: number | null;
  children: React.ReactElement[];
};

export function Chips({ children, number, sizeClassName }: ChipsProps) {
  return (
    <div className="flex">
      {children.map((child, key) =>
        number && key >= number ? null : (
          <div key={key} className={cn(key > 0 && "-ml-2")}>
            {child}
          </div>
        )
      )}
      {number && children.length > number && (
        <div className={cn("-ml-2")}>
          <Chip solid className={cn("h-4 w-4", sizeClassName)}>
            <p className="font-walsheim text-[8px] font-medium text-white">+{children.length - number}</p>
          </Chip>
        </div>
      )}
    </div>
  );
}
