import { useAuth0 } from "@auth0/auth0-react";

import { Link } from "components/ds/link/link";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { SocialIconLink } from "components/features/social-icon-link/social-icon-link";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TMoreInfos } from "./more-infos.types";

export function MoreInfos({ moreInfos }: TMoreInfos.Props) {
  const { isAuthenticated } = useAuth0();

  const fakeExternalLinks = [
    {
      url: "t.me/",
      value: <Translate token="v2.commons.form.contact.telegram.placeholder" />,
    },
    {
      url: "discord.com/",
      value: <Translate token="v2.commons.form.contact.discord.placeholder" />,
    },
    {
      url: "x.com/",
      value: <Translate token="v2.commons.form.contact.twitter.placeholder" />,
    },
  ];

  if (!moreInfos.length) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.moreInfo",
      }}
      remixIconName="ri-link"
    >
      <Flex as="ul" direction="col" className="gap-2">
        {isAuthenticated ? (
          <>
            {moreInfos.map(({ url, value }) => {
              const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

              return (
                <Flex key={validUrl} as="li" alignItems="center" className="gap-1">
                  <SocialIconLink url={validUrl} />

                  <Link href={validUrl}>
                    <Typography variant="body-s" className="truncate">
                      {value || validUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "")}
                    </Typography>
                  </Link>
                </Flex>
              );
            })}
          </>
        ) : (
          <>
            {fakeExternalLinks.map(({ url, value }) => (
              <Tooltip
                key={url}
                content={<Translate token="v2.pages.project.overview.projectDetails.links.preventAnonymous" />}
                className="w-fit"
              >
                <Flex alignItems="center" className="cursor-not-allowed gap-1">
                  <SocialIconLink url={url} />

                  <Typography variant="body-s" className="truncate">
                    {value}
                  </Typography>
                </Flex>
              </Tooltip>
            ))}
          </>
        )}
      </Flex>
    </Section>
  );
}
