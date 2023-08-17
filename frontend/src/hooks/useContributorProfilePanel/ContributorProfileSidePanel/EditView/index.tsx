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
import CompletionBar from "src/components/CompletionBar";
import { useState } from "react";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
  setEditMode: (value: boolean) => void;
};

export default function EditView({ profile, setEditMode }: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const formMethods = useForm<UserProfileInfo>({
    defaultValues: fromFragment(profile),
    mode: "onChange",
  });
  const { handleSubmit, formState, control, getValues } = formMethods;
  const { isDirty, isValid } = formState;
  const [completionScore, setCompletionScore] = useState(profile.completionScore);

  const weeklyTimeAllocations: { [key in AllocatedTime]: string } = {
    [AllocatedTime.None]: T("profile.form.weeklyAllocatedTime.none"),
    [AllocatedTime.LessThanOneDay]: T("profile.form.weeklyAllocatedTime.lessThan1Day"),
    [AllocatedTime.OneToThreeDays]: T("profile.form.weeklyAllocatedTime.1to3days"),
    [AllocatedTime.MoreThanThreeDays]: T("profile.form.weeklyAllocatedTime.moreThan3days"),
  };

  const [updateUserProfileInfo, { loading }] = useUpdateUserProfileMutation({
    context: { graphqlErrorDisplay: "toaster" },
    refetchQueries: [{ query: OwnUserProfileDocument, variables: { githubUserId: profile.githubUserId } }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setEditMode(false);
    },
  });

  const updateCompletionScore = () => {
    const score = (value: string | number | null, score: number) => (value && value !== "" ? score : 0);

    const { bio, email, discord, githubHandle, linkedin, location, telegram, whatsapp, twitter, languages, website } =
      getValues();

    setCompletionScore(
      score(profile.avatarUrl, 5) +
        score(githubHandle, 10) +
        score(location, 10) +
        score(bio, 20) +
        score(website, 10) +
        score(githubHandle, 5) +
        score(email, 5) +
        score(telegram, 5) +
        score(whatsapp, 5) +
        score(twitter, 5) +
        score(discord, 5) +
        score(linkedin, 5) +
        score(Object.keys(languages).length, 10)
    );
  };

  const onSubmit = (formData: UserProfileInfo) => updateUserProfileInfo({ variables: toVariables(formData) });

  return (
    <FormProvider {...formMethods}>
      <form
        id="profile-info-form"
        className="h-full min-h-0"
        onSubmit={handleSubmit(onSubmit)}
        onChange={updateCompletionScore}
        onClick={updateCompletionScore}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex min-h-0 flex-col gap-6">
            <Controller
              name="cover"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Header editable profile={{ ...profile, cover: value }} onChange={onChange} />
              )}
            />

            <div className="-mt-[72px] mr-2 flex flex-col gap-6 pb-12 pl-8 pr-6 pt-[72px] scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
              <div data-testid="login" className="font-belwe text-3xl font-normal text-white">
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
                        <div className="flex flex-row items-center gap-1 text-orange-500">
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

          <div className="flex flex-row items-center justify-between border-t border-greyscale-50/8 bg-white/2 px-8 py-5">
            <Tag size={TagSize.Medium} testid="dirtyTag">
              {isDirty || !isValid ? (
                <div className="flex flex-row items-center gap-1 text-spacePurple-300">
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
            <div className="flex flex-row items-center gap-5">
              {isXl && completionScore < 95 && (
                <div className="flex w-48 flex-col gap-2">
                  <div className="self-end font-walsheim text-sm font-medium text-greyscale-50">
                    {T("profile.form.completion", { completion: completionScore.toString() })}
                  </div>
                  <CompletionBar completionScore={completionScore} />
                </div>
              )}
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
        </div>
      </form>
    </FormProvider>
  );
}
