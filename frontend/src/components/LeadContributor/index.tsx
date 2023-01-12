export interface ProjectLeadProps {
  displayName?: string;
  avatarUrl?: string;
  userDisplayName?: string;
}

export default function ProjectLead({ displayName, avatarUrl, userDisplayName }: ProjectLeadProps) {
  return (
    <div className="text-md text-neutral-300 font-bold flex flex-row gap-1 items-center">
      <img src={avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
      <div className="text-purple-700">{displayName}</div>
      {userDisplayName === displayName && <div> (you)</div>}
    </div>
  );
}
