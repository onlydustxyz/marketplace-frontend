import { UserProfileFragment } from "src/__generated/graphql";
import { useIntl } from "src/hooks/useIntl";

import ErrorWarningLine from "src/icons/ErrorWarningLine";
import CheckLine from "src/icons/CheckLine";
import Button, { ButtonSize } from "src/components/Button";
import Tag, { TagSize } from "src/components/Tag";
import Header, { HeaderColor } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/Header";
import Card from "./Card";
import { Section } from "./Section";
import Input, { Size } from "src/components/FormInput";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import GlobalLine from "src/icons/GlobalLine";
import MapPinLine from "src/icons/MapPinLine";
import { UserProfileInfo, fromFragment } from "./types";
import { useEffect } from "react";
import GithubLogo from "src/icons/GithubLogo";
import Telegram from "src/assets/icons/Telegram";
import TwitterFill from "src/icons/TwitterFill";
import DiscordFill from "src/icons/DiscordFill";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import MailLine from "src/icons/MailLine";
import CloseLine from "src/icons/CloseLine";
import classNames from "classnames";

type Props = {
  profile: UserProfileFragment;
  headerColor: HeaderColor;
  setEditMode: (value: boolean) => void;
};

export default function EditView({ profile, headerColor, setEditMode }: Props) {
  const { T } = useIntl();

  const formMethods = useForm<UserProfileInfo>();
  const { handleSubmit, reset, formState } = formMethods;
  const { isDirty } = formState;

  useEffect(() => reset(fromFragment(profile)), [profile]);

  const onSubmit = () => setEditMode(false);

  return (
    <FormProvider {...formMethods}>
      <form id="payout-info-form" className="h-full min-h-0" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-6">
            <Header color={headerColor} avatarUrl={profile.avatarUrl} />

            <div className="flex flex-col gap-6 mx-8">
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
                <Section title={T("profile.form.contactInfo")}>
                  <div className="flex flex-col gap-3">
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="githubHandle"
                      prefixComponent={<GithubLogo className="text-greyscale-600" />}
                      suffixComponent={<ClearFieldButton name="githubHandle" disabled />}
                      inputClassName="pl-9"
                      disabled
                    />
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="email"
                      prefixComponent={<MailLine className="text-greyscale-600" />}
                      suffixComponent={<ClearFieldButton name="email" disabled />}
                      inputClassName="pl-9"
                      disabled
                    />
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="telegram"
                      prefixComponent={<Telegram size={16} />}
                      suffixComponent={<ClearFieldButton name="telegram" />}
                      inputClassName="pl-9"
                    />
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="twitter"
                      prefixComponent={<TwitterFill />}
                      suffixComponent={<ClearFieldButton name="twitter" />}
                      inputClassName="pl-9"
                    />
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="discord"
                      prefixComponent={<DiscordFill />}
                      suffixComponent={<ClearFieldButton name="discord" />}
                      inputClassName="pl-9"
                    />
                    <Input
                      size={Size.Sm}
                      withMargin={false}
                      name="linkedin"
                      prefixComponent={<LinkedinBoxFill />}
                      suffixComponent={<ClearFieldButton name="linkedin" />}
                      inputClassName="pl-9"
                    />
                  </div>
                </Section>
              </Card>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between bg-white/2 border-t border-greyscale-50/8 px-8 py-5">
            <Tag size={TagSize.Medium}>
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

type CloseButtonProps = {
  name: string;
  disabled?: boolean;
};

function ClearFieldButton({ name, disabled }: CloseButtonProps) {
  const { setValue } = useFormContext();
  return (
    <CloseLine
      className={classNames("flex place-items-center absolute right-0 mr-3", {
        "text-greyscale-600": disabled,
        "hover:text-spacePurple-200 cursor-pointer": !disabled,
      })}
      onClick={() => {
        if (!disabled) setValue(name, "");
      }}
    />
  );
}
