import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";
import Image from "next/image";
import { Key } from "src/hooks/useIntl";
import { ElementType } from "react";

interface EmptyStateProps {
  as?: ElementType;
  illustrationSrc: string;
  titleToken: Key;
  titleTokenParams?: Record<string, string>;
  descriptionToken?: Key;
  descriptionTokenParams?: Record<string, string>;
  actionLabelToken?: Key;
  onAction?: () => void;
}

export function EmptyState({
  as = "section",
  illustrationSrc,
  titleToken,
  titleTokenParams,
  descriptionToken,
  descriptionTokenParams,
  actionLabelToken,
  onAction,
}: EmptyStateProps) {
  const Component = as;
  return (
    <Component className="flex flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="w-20">
        <Image src={illustrationSrc} width={80} height={80} alt="Empty state picture" />
      </div>
      <div>
        <Typography
          variant="title-l"
          className="mb-1 font-belwe"
          translate={{ token: titleToken, params: titleTokenParams }}
        />
        {descriptionToken ? (
          <Typography
            variant="body-s"
            className="font-walsheim text-spaceBlue-200"
            translate={{ token: descriptionToken, params: descriptionTokenParams }}
          />
        ) : null}
      </div>
      {actionLabelToken ? (
        <Button size="m" className="whitespace-nowrap" variant="primary" accentColor="orange" onClick={onAction}>
          <Translate token={actionLabelToken} />
        </Button>
      ) : null}
    </Component>
  );
}
