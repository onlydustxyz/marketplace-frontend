import {
  AllocatedTime,
  OwnUserProfileDetailsFragment,
  UserProfileDocument,
  UserProfileFragment,
  useUpdateUserProfileMutation,
} from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";

import ErrorWarningLine from "src/icons/ErrorWarningLine";
import CheckLine from "src/icons/CheckLine";
import Button, { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import Header, { HeaderColor } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import Card from "./Card";
import { Section } from "./Section";
import Input, { Size } from "src/components/FormInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import GlobalLine from "src/icons/GlobalLine";
import MapPinLine from "src/icons/MapPinLine";
import { UserProfileInfo, fromFragment, toVariables } from "./types";
import { useEffect } from "react";
import GithubLogo from "src/icons/GithubLogo";
import Telegram from "src/assets/icons/Telegram";
import TwitterFill from "src/icons/TwitterFill";
import DiscordFill from "src/icons/DiscordFill";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import MailLine from "src/icons/MailLine";
import ContactInformation from "./ContactInformation";
import TechnologiesCard from "./TechnologiesCard";
import FormSelect from "src/components/FormSelect";
import LockFill from "src/icons/LockFill";
import FormToggle from "src/components/FormToggle";

type Props = {
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
  headerColor: HeaderColor;
  setEditMode: (value: boolean) => void;
};

export default function EditView({ profile, headerColor, setEditMode }: Props) {
  const { T } = useIntl();

  const formMethods = useForm<UserProfileInfo>({ defaultValues: fromFragment(profile) });
  const { handleSubmit, reset, formState, control } = formMethods;
  const { isDirty } = formState;

  useEffect(() => reset(fromFragment(profile)), [profile]);

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("profile.form.weeklyAllocatedTime.none"),
    [AllocatedTime.LessThanOneDay]: T("profile.form.weeklyAllocatedTime.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("profile.form.weeklyAllocatedTime.1to3days"),
    [AllocatedTime.MoreThanThreeDays]: T("profile.form.weeklyAllocatedTime.moreThan3days"),
  };

  const [updateUserProfileInfo] = useUpdateUserProfileMutation({
    refetchQueries: [{ query: UserProfileDocument, variables: { githubUserId: profile.githubUserId } }],
    awaitRefetchQueries: true,
    onCompleted: () => setEditMode(false),
  });

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo({ variables: toVariables(formData) });

  return (
    <FormProvider {...formMethods}>
      <form id="profile-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6 min-h-0">
            <Header color={headerColor} avatarUrl={profile.avatarUrl} />

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
                <Section gap="wide" title={T("profile.form.contactInfo")}>
                  <div className="flex flex-col gap-3">
                    <ContactInformation
                      name="githubHandle"
                      icon={<GithubLogo className="text-greyscale-600" />}
                      editDisabled
                      visibilityName="isGithubHandlePublic"
                      visibilityDisabled
                    />
                    <ContactInformation
                      name="email"
                      icon={<MailLine className="text-greyscale-600" />}
                      editDisabled
                      visibilityName="isEmailPublic"
                    />
                    <ContactInformation
                      name="telegram"
                      icon={<Telegram size={16} />}
                      visibilityName="isTelegramPublic"
                    />
                    <ContactInformation name="twitter" icon={<TwitterFill />} visibilityName="isTwitterPublic" />
                    <ContactInformation name="discord" icon={<DiscordFill />} visibilityName="isDiscordPublic" />
                    <ContactInformation name="linkedin" icon={<LinkedinBoxFill />} visibilityName="isLinkedInPublic" />
                  </div>
                </Section>
              </Card>
              <Controller
                name="languages"
                render={({ field: { value, onChange } }) => (
                  <TechnologiesCard technologies={value} setTechnologies={onChange} />
                )}
              />

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
              {isDirty ? (
                <div className="text-orange-500 flex flex-row items-center gap-1">
                  <ErrorWarningLine /> {T("profile.form.saveStatus.unsaved")}
                </div>
              ) : (
                <>
                  <CheckLine />
                  {T("profile.form.saveStatus.saved")}
                </>
              )}
            </Tag>
            <Button size={ButtonSize.Md} htmlType="submit" data-testid="profile-form-submit-button">
              <CheckLine />
              {T("profile.form.done")}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
