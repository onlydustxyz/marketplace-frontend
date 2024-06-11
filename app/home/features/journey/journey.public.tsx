"use client";

import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import process from "process";
import odCommunityTips from "public/images/od-community-tips.png";

import { TJourney } from "app/home/features/journey/journey.types";
import styles from "app/home/styles/styles.module.css";

import { cn } from "src/utils/cn";

import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Section } from "components/layout/section/section";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function JourneyPublic(_: TJourney.JourneyPublicProps) {
  const { loginWithRedirect } = useAuth0();
  const { T } = useIntl();
  function handleLogin() {
    handleLoginWithRedirect(loginWithRedirect);
  }

  const blogUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_PREFIX ?? "";

  return (
    <div className={cn("flex w-full flex-col gap-8", styles.areaJourney)}>
      <Section
        iconProps={{ remixName: "ri-rocket-2-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.journey.title",
          },
        }}
      >
        <Button
          onClick={handleLogin}
          className="flex h-20 w-full !bg-transparent p-0 text-left text-snow hover:text-snow"
        >
          <Banner
            title={<Translate token="v2.pages.home.journey.public.subtitle" />}
            description={<Translate token="v2.pages.home.journey.public.description" />}
            size="m"
            icon={{ remixName: "ri-user-line" }}
            variant="rainbow"
            endElement={<IconTag icon={{ remixName: "ri-arrow-right-s-line", size: 16 }} size={"s"} />}
            classNames={{ wrapper: "w-full" }}
          />
        </Button>
      </Section>

      <Section
        iconProps={{ remixName: "ri-graduation-cap-line" }}
        titleProps={{
          translate: {
            token: "v2.pages.home.journey.learnMore.title",
          },
        }}
        rightContent={
          <>
            <BaseLink href={blogUrl} className="hidden gap-1 text-spacePurple-500 sm:flex">
              <Typography translate={{ token: "v2.pages.home.journey.learnMore.readBlog" }} variant="body-s-bold" />
              <Icon remixName="ri-arrow-right-s-line" size={16} />
            </BaseLink>
            <BaseLink
              href={blogUrl}
              className={"block sm:hidden"}
              title={T("v2.pages.home.journey.learnMore.readBlog")}
            >
              <Button variant={"secondary"} size={"s"} iconOnly>
                <Icon remixName={"ri-exchange-dollar-line"} />
              </Button>
            </BaseLink>
          </>
        }
        classNames={{
          section: "hidden md:flex",
        }}
      >
        <Card background={"base"} className="flex items-center gap-6">
          <Image
            src={odCommunityTips}
            alt="Onlydust community tips"
            className="max-w-[50%] flex-none rounded-xl"
            priority={false}
          />
          <div className="flex flex-1 flex-col gap-4">
            <Typography variant="title-s" translate={{ token: "v2.pages.home.journey.learnMore.subtitle" }} />
            <Typography
              variant="body-s"
              translate={{ token: "v2.pages.home.journey.learnMore.description" }}
              className="text-spaceBlue-200"
            />
            <BaseLink href={blogUrl}>
              <Button variant="secondary" size="s">
                <Translate token="v2.pages.home.journey.learnMore.buttonLabel" />
              </Button>
            </BaseLink>
          </div>
        </Card>
      </Section>
    </div>
  );
}
