import { ClassAttributes, Dispatch, HTMLAttributes, SetStateAction, useContext } from "react";
import { Controller } from "react-hook-form";
import ProjectApi from "src/api/Project";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import {
  FieldProjectLead,
  SelectedLeadType,
} from "src/pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { EditContext, EditFormData } from "../EditContext";
import { RewardableContributionsField } from "../RewardableContributionsField";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import AddLine from "src/icons/AddLine";
import Draggable from "src/icons/Draggable";
import DeleteBinLine from "src/icons/DeleteBinLine";
import { SortableItem, SortableItemProps, SortableList } from "@thaddeusjiang/react-sortable-list";
import { cn } from "src/utils/cn";

const DragHandler = (
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
) => (
  <div
    {...props}
    className={cn(
      "align-center flex h-8 w-8 items-center justify-center pr-2",
      "cursor-grab text-base active:cursor-grabbing",
      "transition duration-300 ease-in-out hover:scale-110 active:-translate-x-[2px]",
      "self-baseline"
    )}
  >
    <Draggable className="text-xl" />
  </div>
);

export function Information() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { form } = useContext(EditContext);

  // react-sortable-list expects an id for each item, so we need to add it
  function decodeValues(values: EditFormData["moreInfos"]) {
    return values?.map((item, index) => ({ ...item, id: (index + 1).toString() })) || [];
  }

  function reorderMoreInfos(reOrder: (items: SortableItemProps[]) => SortableItemProps[]) {
    const values = decodeValues(form?.getValues("moreInfos"));
    const reorderValues = reOrder(values).map(({ id: _, ...rest }) => rest);
    form?.setValue("moreInfos", reorderValues as EditFormData["moreInfos"], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  const {
    mutate: uploadProjectLogo,
    isSuccess: successUploadLogo,
    isPending: loadingUploadLogo,
  } = ProjectApi.mutations.useUploadLogo({
    options: {
      onSuccess: data => {
        showToaster(T("project.details.edit.toasts.logoUpdate"));
        form?.setValue("logoUrl", data.url, { shouldDirty: true });
      },
    },
  });

  function handleProjectLeadsChange({ invited, toKeep }: { invited: SelectedLeadType[]; toKeep: SelectedLeadType[] }) {
    const invitedUsers = invited.map(lead => lead.githubUserId).filter(Boolean) as number[];
    const usersToKeep = toKeep.map(lead => lead.id).filter(Boolean) as string[];

    form?.setValue("inviteGithubUserIdsAsProjectLeads", invitedUsers, { shouldDirty: true });
    form?.setValue("projectLeadsToKeep", usersToKeep, { shouldDirty: true });
    form?.setValue("projectLeads", { invited, toKeep }, { shouldDirty: true });
  }

  return (
    <Flex direction="col" gap={8} className="w-full">
      <Flex
        direction="col"
        className="border-card-light w-full divide-y divide-card-border-light [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-6"
      >
        <Controller
          name="name"
          control={form?.control}
          render={props => (
            <FieldInput
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.name.label")}
              placeholder={T("project.details.edit.informations.fields.name.placeholder")}
              errorMessage={props.fieldState.error?.message}
              infoMessage={{
                children: T("project.details.edit.informations.fields.name.info"),
                icon: ({ className }) => <InformationLine className={className} />,
              }}
            />
          )}
        />
        <Controller
          name="shortDescription"
          control={form?.control}
          render={props => (
            <FieldInput
              {...props.field}
              {...props.fieldState}
              errorMessage={props.fieldState.error?.message}
              label={T("project.details.edit.informations.fields.short.label")}
            />
          )}
        />
        <Controller
          name="longDescription"
          control={form?.control}
          render={props => (
            <FieldTextarea
              {...props.field}
              {...props.fieldState}
              errorMessage={props.fieldState.error?.message}
              rows={4}
              label={T("project.details.edit.informations.fields.long.label")}
              autogrow
            />
          )}
        />
        <Controller
          name="logoUrl"
          control={form?.control}
          render={props => (
            <FieldImage
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.logo.label")}
              max_size_mo={10}
              upload={{
                mutate: uploadProjectLogo,
                success: successUploadLogo,
                loading: loadingUploadLogo,
              }}
            />
          )}
        />

        <Controller
          name="moreInfos"
          control={form?.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <Flex className="w-full flex-col gap-2">
                <Flex className="w-full items-center justify-between pb-2">
                  <div className="font-walsheim text-sm font-medium text-spaceBlue-200">
                    {T("project.details.edit.informations.fields.moreInfo.label")}
                  </div>
                  <Button
                    type={ButtonType.Secondary}
                    size={ButtonSize.Xs}
                    onClick={() => {
                      const moreInfos = [...(form?.getValues("moreInfos") || [])];
                      moreInfos.push({ url: "", value: "" });
                      form?.setValue("moreInfos", moreInfos, { shouldDirty: false, shouldValidate: false });
                    }}
                  >
                    <AddLine className="text-body-m" />
                    {T("project.details.create.informations.form.fields.moreInfo.add")}
                  </Button>
                </Flex>

                <Flex className="w-full flex-col gap-4">
                  <SortableList
                    items={decodeValues(value)}
                    setItems={reorderMoreInfos as Dispatch<SetStateAction<SortableItemProps[]>>}
                  >
                    {({ items }: { items: SortableItemProps[] }) => (
                      <div className="w-full space-y-4">
                        {items.map((item: SortableItemProps, index) => (
                          <SortableItem
                            id={item.id}
                            key={item.id}
                            DragHandler={DragHandler}
                            className="flex w-full items-center"
                          >
                            <Flex key={"moreInfo" + index} className="w-full items-baseline justify-center gap-2">
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
                                startIcon={({ className }) => <Link className={className} />}
                              />
                              <FieldInput
                                name={"moreInfos.value-" + index}
                                value={item.value}
                                placeholder={T(
                                  "project.details.create.informations.form.fields.moreInfo.placeholderLabel"
                                )}
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
                                  onClick={() => {
                                    const moreInfos = [...(form?.getValues("moreInfos") || [])];
                                    moreInfos.splice(index, 1);
                                    form?.setValue("moreInfos", moreInfos, {
                                      shouldDirty: true,
                                      shouldValidate: false,
                                    });
                                  }}
                                >
                                  <DeleteBinLine />
                                </Button>
                              ) : null}
                            </Flex>
                          </SortableItem>
                        ))}
                      </div>
                    )}
                  </SortableList>
                </Flex>
              </Flex>
            );
          }}
        />

        <Controller
          name="projectLeads"
          control={form?.control}
          render={({ field: { value, name } }) => (
            <FieldProjectLead
              name={name}
              value={value}
              onChange={({ invited, toKeep }) => handleProjectLeadsChange({ invited, toKeep })}
            />
          )}
        />
        <Controller
          name="rewardSettings"
          control={form?.control}
          render={props => {
            return (
              <RewardableContributionsField
                {...props.field}
                onChange={data => {
                  form?.setValue("rewardSettings", data, { shouldDirty: true });
                }}
              />
            );
          }}
        />

        <Controller
          name="isLookingForContributors"
          control={form?.control}
          render={props => (
            <FieldSwitch
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.hire.label")}
              switchLabel={T("project.details.edit.informations.fields.hire.subLabel")}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
