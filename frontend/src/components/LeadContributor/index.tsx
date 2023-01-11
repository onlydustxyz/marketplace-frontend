import { useT } from "talkr";

export type Lead = { displayName?: string; avatarUrl?: string };

export default function ProjectLead({ displayName, avatarUrl }: Lead) {
  const { T } = useT();
  return (
    <div className="text-sm text-neutral-500 font-medium flex flex-row gap-1">
      <div>
        <span>{T("project.ledBy")}</span> <span className="text-purple-700">{displayName}</span>{" "}
      </div>
      <img src={avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
    </div>
  );
}
