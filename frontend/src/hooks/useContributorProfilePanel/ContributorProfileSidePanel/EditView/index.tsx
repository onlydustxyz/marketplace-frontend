import {
  AllocatedTime,
  OwnUserProfileDetailsFragment,
  OwnUserProfileDocument,
  UserProfileFragment,
  useUpdateUserProfileMutation,
} from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";

import ErrorWarningLine from "src/icons/ErrorWarningLine";
import CheckLine from "src/icons/CheckLine";
import Button, { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import Header from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import Card from "./Card";
import { Section } from "./Section";
import Input, { Size } from "src/components/FormInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import GlobalLine from "src/icons/GlobalLine";
import MapPinLine from "src/icons/MapPinLine";
import { UserProfileInfo, fromFragment, toVariables } from "./types";
import ContactInformations from "src/components/ContactInformations";
import TechnologiesSelect from "src/components/TechnologiesSelect";
import FormSelect from "src/components/FormSelect";
import LockFill from "src/icons/LockFill";
import FormToggle from "src/components/FormToggle";

type Props = {
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
  setEditMode: (value: boolean) => void;
};

export default function EditView({ profile, setEditMode }: Props) {
  const { T } = useIntl();

  const formMethods = useForm<UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });
  const { handleSubmit, formState, control } = formMethods;
  const { isDirty, isValid } = formState;

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("profile.form.weeklyAllocatedTime.none"),
    [AllocatedTime.LessThanOneDay]: T("profile.form.weeklyAllocatedTime.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("profile.form.weeklyAllocatedTime.1to3days"),
    [AllocatedTime.MoreThanThreeDays]: T("profile.form.weeklyAllocatedTime.moreThan3days"),
  };

  const [updateUserProfileInfo, { loading }] = useUpdateUserProfileMutation({
    refetchQueries: [{ query: OwnUserProfileDocument, variables: { githubUserId: profile.githubUserId } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setEditMode(false);
    },
  });

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo({ variables: toVariables(formData) });

  return (
    <FormProvider {...formMethods}>
      <form id="profile-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6 min-h-0">
            <Controller
              name="cover"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Header editable profile={{ ...profile, cover: value }} onChange={onChange} />
              )}
            />

            <div className="flex flex-col gap-6 -mt-[72px] pt-[72px] pb-12 pl-8 mr-2 pr-6 scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
              <div data-testid="login" className="font-belwe font-normal text-3xl text-white">
                {profile.login}
              </div>

              <Card>
                <Section title={T("profile.form.location")}>
                  <Input
                    size={Size.Sm}
                    withMargin={false}
                    name="location"
                    prefixComponent={<MapPinLine />}
                    inputClassName="pl-9"
                  />
                </Section>
                <Section title={T("profile.form.bio")}>
                  <Input
                    size={Size.Sm}
                    withMargin={false}
                    name="bio"
                    as="textarea"
                    inputProps={{
                      rows: 5,
                    }}
                  />
                </Section>
                <Section title={T("profile.form.website")}>
                  <Input
                    size={Size.Sm}
                    withMargin={false}
                    name="website"
                    prefixComponent={<GlobalLine />}
                    inputClassName="pl-9"
                  />
                </Section>
              </Card>
              <Card>
                <Section gap="wide" title={T("profile.form.contactInfo.title")}>
                  <ContactInformations />
                </Section>
              </Card>
              <Card>
                <Section
                  gap="wide"
                  title={T("profile.edit.sections.technologies.title")}
                  subtitle={T("profile.edit.sections.technologies.subtitle")}
                >
                  <Controller
                    name="languages"
                    render={({ field: { value, onChange } }) => (
                      <TechnologiesSelect technologies={value} setTechnologies={onChange} />
                    )}
                  />
                </Section>
              </Card>

              <Card>
                <Section
                  gap="wide"
                  title={
                    <div className="flex flex-row items-center justify-between">
                      {T("profile.form.weeklyAllocatedTime.title")}
                      <Tag size={TagSize.Small}>
                        <div className="text-orange-500 flex flex-row items-center gap-1">
                          <LockFill />
                          {T("profile.form.weeklyAllocatedTime.privacyNotice")}
                        </div>
                      </Tag>
                    </div>
                  }
                >
                  <FormSelect
                    name="weeklyAllocatedTime"
                    options={Object.entries(weeklyTimeAllocations).map(([value, label]) => ({ value, label }))}
                    control={control}
                  />
                  <FormToggle
                    name="lookingForAJob"
                    control={control}
                    label={T("profile.form.weeklyAllocatedTime.lookingForAJob")}
                  />
                </Section>
              </Card>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between bg-white/2 border-t border-greyscale-50/8 px-8 py-5">
            <Tag size={TagSize.Medium} testid="dirtyTag">
              {isDirty || !isValid ? (
                <div className="text-orange-500 flex flex-row items-center gap-1">
                  <ErrorWarningLine />
                  {isValid ? T("profile.form.saveStatus.unsaved") : T("profile.form.saveStatus.invalid")}
                </div>
              ) : (
                <>
                  <CheckLine />
                  {T("profile.form.saveStatus.saved")}
                </>
              )}
            </Tag>
            <Button
              size={ButtonSize.Md}
              htmlType="submit"
              disabled={loading || !isValid}
              data-testid="profile-form-submit-button"
            >
              <CheckLine />
              {T("profile.form.done")}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
