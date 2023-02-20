import { useAuth } from "src/hooks/useAuth";

export interface ProjectLeadProps {
  displayName?: string;
  avatarUrl?: string;
}

export default function ProjectLead__deprecated({ displayName, avatarUrl }: ProjectLeadProps) {
  const { user } = useAuth();
  return (
    <div className="text-md text-neutral-300 font-bold flex flex-row gap-2 items-center">
      <img src={avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
      <div className="text-purple-700 truncate">
        <a href={`https://github.com/${displayName}`} target="_blank" rel="noreferrer">
          {displayName}
        </a>
      </div>
      {user?.displayName === displayName && <div>(you)</div>}
    </div>
  );
}
