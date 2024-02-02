import { Controller, useFormContext } from "react-hook-form";

import MeApi from "src/api/me";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";

import { TProfileForm } from "../form.types";
import { BannerButton } from "./banner-button/banner-button";
import { FormInformationsSection } from "./section/section";

// TODO: Change rounded image
export function FormInformations() {
  const { T } = useIntl();
  const { control, setValue } = useFormContext();

  const handleCoverClick = (cover: TProfileForm.Data["cover"]) => {
    setValue("cover", cover);
  };

  const {
    mutate: uploadProjectLogo,
    isPending: loadingUploadLogo,
    isSuccess: successUploadLogo,
  } = MeApi.mutations.useUploadProfilePicture({
    options: {
      onSuccess: data => {
        setValue("avatarUrl", data.url);
      },
    },
  });

  return (
    <Card background="base">
      <FormInformationsSection title="v2.pages.settings.publicProfile.informations.avatar">
        <Controller
          name="avatarUrl"
          control={control}
          render={({ field, fieldState }) => (
            <FieldImage
              {...field}
              {...fieldState}
              placeholder={T("project.details.create.informations.form.fields.logo.placeholder")}
              max_size_mo={10}
              upload={{
                mutate: uploadProjectLogo,
                success: successUploadLogo,
                loading: loadingUploadLogo,
              }}
            />
          )}
        />
      </FormInformationsSection>

      <FormInformationsSection title="v2.pages.settings.publicProfile.informations.banner">
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <Flex
              alignItems="center"
              justifyContent="center"
              className={cn("h-36 w-full rounded-2xl bg-cover", {
                "bg-profile-cyan": field.value === "CYAN",
                "bg-profile-magenta": field.value === "MAGENTA",
                "bg-profile-yellow": field.value === "YELLOW",
                "bg-profile-blue": field.value === "BLUE",
              })}
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                className="gap-3 rounded-full border border-greyscale-50/8 bg-white/8 px-6 py-3 shadow-heavy"
              >
                <BannerButton active={field.value === "CYAN"} cover="CYAN" onClick={handleCoverClick} />
                <BannerButton active={field.value === "MAGENTA"} cover="MAGENTA" onClick={handleCoverClick} />
                <BannerButton active={field.value === "YELLOW"} cover="YELLOW" onClick={handleCoverClick} />
                <BannerButton active={field.value === "BLUE"} cover="BLUE" onClick={handleCoverClick} />
              </Flex>
            </Flex>
          )}
        />
      </FormInformationsSection>

      <FormInformationsSection title="v2.pages.settings.publicProfile.informations.location">
        <Controller
          name="location"
          control={control}
          render={({ field, fieldState }) => (
            <FieldInput
              {...field}
              {...fieldState}
              startIcon={({ className }) => <Icon remixName="ri-map-pin-line" className={className} />}
            />
          )}
        />
      </FormInformationsSection>

      <FormInformationsSection title="v2.pages.settings.publicProfile.informations.bio">
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => <FieldInput {...field} {...fieldState} />}
        />
      </FormInformationsSection>

      <FormInformationsSection title="v2.pages.settings.publicProfile.informations.website" isLast>
        <Controller
          name="website"
          control={control}
          render={({ field, fieldState }) => (
            <FieldInput
              {...field}
              {...fieldState}
              startIcon={({ className }) => <Icon remixName="ri-global-line" className={className} />}
            />
          )}
        />
      </FormInformationsSection>
    </Card>
  );
}
