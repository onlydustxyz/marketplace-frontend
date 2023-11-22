import { FC } from "react";
import { IMAGES } from "src/assets/img";
import { Avatar } from "src/components/New/Avatar";
import CheckLine from "src/icons/CheckLine";

export interface FieldProjectLeadSelectItemProps {
  avatarUrl?: string;
  login: string;
  isRegistered: boolean;
  selected: boolean;
}

export const FieldProjectLeadSelectItem: FC<FieldProjectLeadSelectItemProps> = ({
  avatarUrl,
  login,
  isRegistered,
  selected,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar src={avatarUrl || ""} alt={login} shape="circle" size="4" />
        <span className="block flex-1 truncate">{login}</span>
        {isRegistered ? <Avatar src={IMAGES.logo.gradient} alt="Onlydust user" size="3.5" /> : null}
      </div>
      {selected ? <CheckLine className="h-4 w-4" /> : null}
    </div>
  );
};
