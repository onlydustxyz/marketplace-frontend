import Tag from "@/components/ds/tag/tag.tsx";
import RecordCircleLine from "../../../../../src/icons/RecordCircleLine.tsx";
import Translate from "@/components/layout/translate/translate.tsx";

type Props = {
  variant?: "default" | "error";
  isHiring: boolean;
};

export default function HiringTag({ variant = "default", isHiring = false }: Props) {
  return isHiring ? (
    <div className="absolute -top-3.5 right-3.5">
      <Tag size="small" borderColor={variant === "error" ? "orange" : undefined}>
        {/*TODO replace with the new icon component*/}
        <RecordCircleLine />
        <Translate token="project.hiring" />
      </Tag>
    </div>
  ) : null;
}
