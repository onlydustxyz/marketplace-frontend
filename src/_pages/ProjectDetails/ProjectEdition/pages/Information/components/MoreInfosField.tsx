import { ClassAttributes, HTMLAttributes } from "react";
import { ControllerFieldState, UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { CreateFormData } from "src/_pages/ProjectCreation/types/ProjectCreationType";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { FieldInput } from "src/components/New/Field/Input";
import { SortableList } from "src/components/New/Sortable/SortableList";
import Flex from "src/components/Utils/Flex";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import DeleteBinLine from "src/icons/DeleteBinLine";
import Draggable from "src/icons/Draggable";
import { MoreInfosField as MoreInfosFieldType } from "src/types";
import { cn } from "src/utils/cn";

import { EditFormData } from "../../../EditContext";
import { SocialIcon } from "./SocialIcon";

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
    form?.setValue("moreInfos", moreInfos, { shouldDirty: false, shouldValidate: true });
  }

  function deleteLink(index: number) {
    const moreInfos = form?.getValues("moreInfos") || [];
    moreInfos.splice(index, 1);
    form?.setValue("moreInfos", moreInfos, {
      shouldDirty: true,
      shouldValidate: true,
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
          itemProps={{
            DragHandler,
            className: cn(
              "flex w-full items-center",
              "border border-card-border-light rounded-lg py-3 px-[6px] md:border-0 md:p-0"
            ),
          }}
        >
          {({ item, items, index }) => (
            <div className={cn("w-full space-y-4", "flex flex-row items-start justify-start md:block")}>
              <Flex
                key={"moreInfo" + item.id}
                className={cn("w-full items-baseline justify-center gap-2", "flex-col md:flex-row")}
              >
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
                  fieldClassName={cn("md:w-1/3", "w-full")}
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
                    className={cn("flex h-8 w-8 justify-center p-2 text-snow", "hidden md:visible")}
                    onClick={() => deleteLink(index)}
                  >
                    <DeleteBinLine />
                  </Button>
                ) : null}
              </Flex>
              <Button
                type={ButtonType.Ternary}
                size={ButtonSize.MdRounded}
                iconOnly
                className={cn("flex h-8 w-8 justify-center p-2 text-snow", "visible !mt-0 md:hidden")}
                onClick={() => deleteLink(index)}
              >
                <DeleteBinLine />
              </Button>
            </div>
          )}
        </SortableList>
      </Flex>
    </Flex>
  );
}
