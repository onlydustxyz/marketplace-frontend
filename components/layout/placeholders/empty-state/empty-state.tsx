"use client";

import Image from "next/image";
import { ElementType } from "react";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Key, useIntl } from "hooks/translate/use-translate";

interface Token {
  token: Key;
  params?: Record<string, string>;
}
interface EmptyStateProps {
  as?: ElementType;
  illustrationSrc: string;
  title?: Token;
  description?: Token;
  actionLabel?: Token;
  onAction?: () => void;
}

export function EmptyState({
  as = "section",
  illustrationSrc,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const Component = as;
  const { T } = useIntl();
  return (
    <Component className="flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="w-20">
        <Image src={illustrationSrc} width={80} height={80} alt={T("emptyStatePictureFallback")} />
      </div>
      <div>
        {title?.token ? (
          <>
            <Typography
              variant="title-m"
              className="mb-1 hidden font-belwe text-greyscale-50 md:block"
              translate={{ token: title?.token, params: title?.params }}
            />
            <Typography
              variant="title-s"
              className="mb-1 font-belwe text-greyscale-50 md:hidden"
              translate={{ token: title?.token, params: title?.params }}
            />
          </>
        ) : null}
        {description?.token ? (
          <Typography
            variant="body-s"
            className="font-walsheim text-spaceBlue-200"
            translate={{ token: description?.token, params: description?.params }}
          />
        ) : null}
      </div>
      {actionLabel?.token ? (
        <>
          <Button
            size="m"
            className="hidden whitespace-nowrap md:block"
            variant="primary"
            accentColor="orange"
            onClick={onAction}
          >
            <Translate token={actionLabel?.token} />
          </Button>
          <Button
            size="s"
            className="whitespace-nowrap md:hidden"
            variant="primary"
            accentColor="orange"
            onClick={onAction}
          >
            <Translate token={actionLabel?.token} />
          </Button>
        </>
      ) : null}
    </Component>
  );
}
