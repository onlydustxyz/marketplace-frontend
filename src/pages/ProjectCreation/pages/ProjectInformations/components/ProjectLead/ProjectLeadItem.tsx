import { FC } from "react";
import { Avatar } from "src/components/New/Avatar";
import CloseLine from "src/icons/CloseLine";

export interface FieldProjectLeadItemProps {
  isYou?: boolean;
  avatar: string;
  label: string;
  onRemove?: () => void;
}

export const FieldProjectLeadItem: FC<FieldProjectLeadItemProps> = ({ isYou = false, avatar, label, onRemove }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Avatar src={avatar} alt={label} shape="circle" size="6" />
        <span className=" text-sm leading-[14px] text-spacePurple-300">{label}</span>
      </div>
      {isYou ? (
        <span className="ml-2 text-sm text-spaceBlue-200">(you)</span>
      ) : (
        <button type="button" onClick={onRemove} className="leading-none">
          <CloseLine className="h-4 w-4 text-spacePurple-300" />
        </button>
      )}
    </div>
  );
};
