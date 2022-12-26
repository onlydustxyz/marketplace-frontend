import { useT } from "talkr";

export type Lead = { displayName?: string; avatarUrl?: string };

export default function ProjectLead({ displayName, avatarUrl }: Lead) {
  const { T } = useT();
  return (
    <div className="text-md text-neutral-500 font-medium flex flex-row gap-1">
      <div>
        <span>{T("project.ledBy")}</span> <span className="text-purple-700">{displayName}</span>{" "}
      </div>
      <div>
        <img src={avatarUrl} className="w-3 md:w-6 rounded-full" />
      </div>
    </div>
  );
}
