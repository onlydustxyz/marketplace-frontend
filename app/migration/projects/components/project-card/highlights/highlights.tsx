import PrivateTag from "src/components/PrivateTag";
import { Thumbnail } from "@/components/ds/thumbnail/thumbnail";
import { THighlights } from "./highlights.types";

export function Highlights({ name, logoUrl, isPrivate, leaders }: THighlights.Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <Thumbnail src={logoUrl} alt="Project Logo" size="xl" className="mt-1" type={"project"} />
        {isPrivate && (
          <div className="absolute -bottom-2.5 -right-2.5">
            <PrivateTag />
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <div className="truncate font-belwe text-2xl font-medium">{name}</div>
        {leaders}
      </div>
    </div>
  );
}
