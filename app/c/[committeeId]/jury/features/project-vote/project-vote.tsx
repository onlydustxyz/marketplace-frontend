import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { TProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote.types";

import { Button } from "components/ds/button/button";
import { DustScore } from "components/features/dust-score/dust-score";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function ProjectVote({ projectId, criteria }: TProjectVote.Props) {
  const { T } = useIntl();

  // useMutationAlert({
  //     mutation: restMutation,
  //     success: {
  //         message: T("v2.pages.committees.applicant.private.form.success"),
  //     },
  //     error: {
  //         default: true,
  //     },
  // });

  const { handleSubmit, control } = useForm<TProjectVote.form>({
    mode: "all",
    resolver: zodResolver(TProjectVote.validation),
    defaultValues: {},
  });

  const { fields } = useFieldArray({
    control,
    name: "criteria",
  });

  function handleFormSubmit(values: TProjectVote.form) {
    // TODO
  }

  return (
    <form className={"grid gap-6"} onSubmit={handleSubmit(handleFormSubmit)}>
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
          // TODO
          //disabled={isLoading || !formState.isValid || isPending}
        >
          {/*{isPending ? <Spinner className="h-4 w-4" /> : <Icon remixName={"ri-check-line"} size={24} />}{" "}*/}
          {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </form>
  );
}
