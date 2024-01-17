import { ReactNode } from "react";
import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

interface EmptyStateProps {
  illustration: ReactNode;
  titleToken: string;
  descriptionToken?: string;
  actionLabelToken?: string;
  onAction?: () => void;
}

export function EmptyState({
  illustration,
  titleToken,
  descriptionToken,
  actionLabelToken,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      {illustration}
      <Typography variant="body-s">
        <Translate token={titleToken} />
      </Typography>
      {descriptionToken ? (
        <Typography variant="body-s">
          <Translate token={descriptionToken} />
        </Typography>
      ) : null}
      {actionLabelToken ? (
        <Button size="s" className="whitespace-nowrap" variant="secondary" accentColor="orange" onClick={onAction}>
          <Translate token={actionLabelToken} />
        </Button>
      ) : null}
    </div>
  );
}
