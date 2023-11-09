import { FC } from "react";
import { Avatar } from "src/components/New/Avatar";
import { useIntl } from "src/hooks/useIntl";
import CloseLine from "src/icons/CloseLine";

type Props = {
  avatar: string;
  label: string;
};

type YouProps = {
  isYou: boolean;
  onRemove?: never;
} & Props;

type RemoveProps = {
  isYou?: never;
  onRemove: () => void;
} & Props;

export type FieldProjectLeadItemProps = YouProps | RemoveProps;

export const FieldProjectLeadItem: FC<FieldProjectLeadItemProps> = ({ isYou = false, avatar, label, onRemove }) => {
  const { T } = useIntl();

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Avatar src={avatar} alt={label} shape="circle" size="6" />
        <span className=" text-sm leading-[14px] text-spacePurple-300">{label}</span>
      </div>
      {isYou ? (
        <span className="ml-2 text-sm text-spaceBlue-200">({T("common.you")})</span>
      ) : (
        <button type="button" onClick={onRemove} className="leading-none">
          <CloseLine className="h-4 w-4 text-spacePurple-300" />
        </button>
      )}
    </div>
  );
};
