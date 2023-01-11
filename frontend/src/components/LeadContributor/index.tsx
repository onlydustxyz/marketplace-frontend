import { useAuth } from "src/hooks/useAuth";

export type Lead = { displayName?: string; avatarUrl?: string };

export default function ProjectLead({ displayName, avatarUrl }: Lead) {
  const { user } = useAuth();
  return (
    <div className="text-md text-neutral-300 font-bold flex flex-row gap-1 items-center">
      <img src={avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
      <div className="text-purple-700">{displayName}</div>
      {user?.displayName === displayName && <div> (you)</div>}
    </div>
  );
}
