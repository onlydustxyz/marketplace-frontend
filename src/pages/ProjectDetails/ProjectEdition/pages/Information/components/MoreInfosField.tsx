import { ClassAttributes, HTMLAttributes } from "react";
import { ControllerFieldState, UseFormReturn } from "react-hook-form";
import Button, { ButtonType, ButtonSize } from "src/components/Button";
import { FieldInput } from "src/components/New/Field/Input";
import Flex from "src/components/Utils/Flex";
import AddLine from "src/icons/AddLine";
import DeleteBinLine from "src/icons/DeleteBinLine";
import Draggable from "src/icons/Draggable";
import { cn } from "src/utils/cn";
import { useIntl } from "src/hooks/useIntl";
import { MoreInfosField as MoreInfosFieldType } from "src/types";
import { SocialIcon } from "./SocialIcon";
import { EditFormData } from "../../../EditContext";
import { SortableList } from "src/components/New/Sortable/SortableList";
import { v4 as uuidv4 } from "uuid";
import { CreateFormData } from "src/pages/ProjectCreation/types/ProjectCreationType";

const DragHandler = (
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
) => (
  <div
    {...props}
    className={cn(
      "align-center flex h-8 w-8 items-center justify-center pr-2",
      "cursor-grab text-base active:cursor-grabbing",
      "transition duration-200 ease-in-out hover:scale-110 active:-translate-x-[2px]",
      "self-baseline"
    )}
  >
    <Draggable className="text-xl" />
  </div>
);

type MoreInfosFieldProps = {
  onChange: (...event: unknown[]) => void;
  value?: MoreInfosFieldType[];
  error?: ControllerFieldState["error"];
};

type FormProps = MoreInfosFieldProps & {
  form: UseFormReturn<EditFormData | CreateFormData, unknown>;
};

export function MoreInfosField({ onChange, value, form, error }: FormProps) {
  const { T } = useIntl();

  function reorderMoreInfos(items: MoreInfosFieldType[]) {
    form?.setValue("moreInfos", items, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function addLink() {
    const moreInfos = form?.getValues("moreInfos") || [];
    moreInfos.push({ url: "", value: "", id: uuidv4() });
    form?.setValue("moreInfos", moreInfos, { shouldDirty: false, shouldValidate: false });
  }

  function deleteLink(index: number) {
    const moreInfos = form?.getValues("moreInfos") || [];
    moreInfos.splice(index, 1);
    form?.setValue("moreInfos", moreInfos, {
      shouldDirty: true,
      shouldValidate: false,
    });
  }

  return (
    <Flex className="w-full flex-col gap-2">
      <Flex className="w-full items-center justify-between pb-2">
        <div className="font-walsheim text-sm font-medium text-spaceBlue-200">
          {T("project.details.edit.informations.fields.moreInfo.label")}
        </div>
        <Button type={ButtonType.Secondary} size={ButtonSize.Xs} onClick={addLink}>
          <AddLine className="text-body-m" />
          {T("project.details.create.informations.form.fields.moreInfo.add")}
        </Button>
      </Flex>

      <Flex className="w-full flex-col gap-4">
        <SortableList
          items={value || []}
          onChange={reorderMoreInfos}
          itemProps={{ DragHandler, className: "flex w-full items-center" }}
        >
          {({ item, items, index }) => (
            <div className="w-full space-y-4">
              <Flex key={"moreInfo" + item.id} className="w-full items-baseline justify-center gap-2">
                <FieldInput
                  name={"moreInfos.url-" + index}
                  value={item.url}
                  fieldClassName="w-full"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errorMessage={(error as any)?.[index]?.url?.message}
                  onChange={event => {
                    const updatedValue = items.map((item, i) =>
                      i === index ? { ...item, url: event.target.value } : item
                    );

                    onChange(updatedValue);
                  }}
                  startIcon={({ className }) => <SocialIcon search={item.url} className={className} />}
                />
                <FieldInput
                  name={"moreInfos.value-" + index}
                  value={item.value}
                  placeholder={T("project.details.create.informations.form.fields.moreInfo.placeholderLabel")}
                  fieldClassName="w-1/3"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  errorMessage={(error as any)?.[index]?.value?.message}
                  onChange={event => {
                    const updatedValue = items.map((item, i) =>
                      i === index ? { ...item, value: event.target.value } : item
                    );
                    onChange(updatedValue);
                  }}
                />
                {items.length > 1 ? (
                  <Button
                    type={ButtonType.Ternary}
                    size={ButtonSize.MdRounded}
                    iconOnly
                    className="h-8 w-8 justify-center p-2 text-snow"
                    onClick={() => deleteLink(index)}
                  >
                    <DeleteBinLine />
                  </Button>
                ) : null}
              </Flex>
            </div>
          )}
        </SortableList>
      </Flex>
    </Flex>
  );
}
