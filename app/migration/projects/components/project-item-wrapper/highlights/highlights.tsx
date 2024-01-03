import { Leader } from "../../../types/projects.types.ts";
import RoundedImage, { ImageSize } from "../../../../../../src/components/RoundedImage";
import PrivateTag from "../../../../../../src/components/PrivateTag";
import Leaders from "../leaders/leaders.tsx";
import { ReactElement } from "react";

type Props = {
  // id: string;
  name: string;
  leaders: ReactElement;
  logoUrl: string;
  isPrivate: boolean;
  // technologies: string[];
};
export default function Highlights({ name, logoUrl, isPrivate, leaders }: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <RoundedImage src={logoUrl} alt="Project Logo" size={ImageSize.Xl} className="mt-1" useLogoFallback />
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
