import { TProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote.types";

import { Button } from "components/ds/button/button";
import { DustScore } from "components/features/dust-score/dust-score";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function ProjectVote({ criteria }: TProjectVote.Props) {
  const { T } = useIntl();

  return (
    <form className={"grid gap-6"}>
      <Typography
        variant={"title-s"}
        translate={{ token: "v2.pages.committees.jury.votingTitle" }}
        className={"text-greyscale-50"}
      />

      <ul className={"grid gap-3"}>
        {criteria.map((c, index) => (
          <li key={index} className={"flex items-start justify-between gap-3"}>
            <Typography variant={"body-s-bold"} className={"pt-1 text-spaceBlue-200"}>
              {c.message}
            </Typography>
            <div className={"shrink-0"}>
              <DustScore initialScore={c.score} isSmall onScoreChange={score => console.log({ score })} />
            </div>
          </li>
        ))}
      </ul>

      <footer className={"flex justify-end"}>
        <Button
          type={"submit"}
          size={"s"}
          backgroundColor={"blue"}
          className="w-full md:w-auto"
          //disabled={isLoading || !formState.isValid || isPending}
        >
          {/*{isPending ? <Spinner className="h-4 w-4" /> : <Icon remixName={"ri-check-line"} size={24} />}{" "}*/}
          {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </form>
  );
}
