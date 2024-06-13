import { Controller, useFormContext } from "react-hook-form";

import MeApi from "src/api/me";
import { FieldImage } from "src/components/New/Field/FileImage";

import { Card } from "components/ds/card/card";
import { Input } from "components/ds/form/input/input";
import { Textarea } from "components/ds/form/textarea/textarea";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { FormInformationsSection } from "./section/section";

// TODO: Handle error image
export function FormInformations() {
  const { control, setValue, setError } = useFormContext();

  const {
    mutate: uploadProjectLogo,
    isPending: loadingUploadLogo,
    isSuccess: successUploadLogo,
  } = MeApi.mutations.useUploadProfilePicture({
    options: {
      onSuccess: data => {
        setValue("avatarUrl", data.url, { shouldDirty: true });
      },
      onError: () => {
        setError("avatarUrl", { type: "validate", message: "test" });
      },
    },
  });

  return (
    <Card background="base">
      <Flex
        direction="col"
        className="gap-4 divide-y divide-solid divide-greyscale-50/8 [&>div:first-child]:pt-0 [&>div]:pt-4"
      >
        <FormInformationsSection title="v2.pages.settings.profile.informations.avatar">
          <Controller
            name="avatarUrl"
            control={control}
            render={({ field, fieldState }) => (
              <FieldImage
                {...field}
                {...fieldState}
                className="h-13 w-13 rounded-full border-4 border-greyscale-50/12"
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

        <Flex className="flex-col gap-4 md:flex-row">
          <FormInformationsSection title="v2.pages.settings.profile.informations.firstname">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => <Input {...field} {...fieldState} />}
            />
          </FormInformationsSection>

          <FormInformationsSection title="v2.pages.settings.profile.informations.lastname">
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => <Input {...field} {...fieldState} />}
            />
          </FormInformationsSection>
        </Flex>

        <FormInformationsSection title="v2.pages.settings.profile.informations.bio">
          <Controller
            name="bio"
            control={control}
            render={({ field, fieldState }) => <Textarea {...field} {...fieldState} />}
          />
        </FormInformationsSection>

        <FormInformationsSection title="v2.pages.settings.profile.informations.location">
          <Controller
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                {...fieldState}
                startContent={<Icon remixName="ri-map-pin-line" className="pointer-events-none" />}
              />
            )}
          />
        </FormInformationsSection>

        <FormInformationsSection title="v2.pages.settings.profile.informations.website">
          <Controller
            name="website"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                {...fieldState}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message ? <Translate token={fieldState.error.message} /> : null}
                startContent={<Icon remixName="ri-global-line" className="pointer-events-none" />}
              />
            )}
          />
        </FormInformationsSection>
      </Flex>
    </Card>
  );
}
