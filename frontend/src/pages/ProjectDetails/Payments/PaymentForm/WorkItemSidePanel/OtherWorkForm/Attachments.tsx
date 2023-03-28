import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";

export default function Attachments() {
  const { T } = useIntl();

  return (
    <div className="flex flex-row justify-between items-center px-4 py-3 font-belwe font-normal text-base text-greyscale-50 rounded-lg border border-greyscale-50/12">
      {T("payment.form.workItems.other.attachments.title")}
      <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
        <Attachment2 />
        {T("payment.form.workItems.other.attachments.addButton")}
      </Button>
    </div>
  );
}
