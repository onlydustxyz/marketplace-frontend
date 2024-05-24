import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { TProjectVote } from "app/c/[committeeId]/jury/features/project-vote/project-vote.types";

import { Button } from "components/ds/button/button";
import { DustScore } from "components/features/dust-score/dust-score";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

export function ProjectVote({ votes }: TProjectVote.Props) {
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

  const { handleSubmit, control, setValue, formState } = useForm<TProjectVote.form>({
    mode: "all",
    resolver: zodResolver(TProjectVote.validation),
    defaultValues: {
      votes,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "votes",
  });

  function handleFormSubmit(values: TProjectVote.form) {
    // TODO
    console.log({ values });

    // TODO invalidate/refetch
  }

  return (
    <form className={"grid gap-6"} onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography
        variant={"title-s"}
        translate={{ token: "v2.pages.committees.jury.votingTitle" }}
        className={"text-greyscale-50"}
      />

      <ul className={"grid gap-3"}>
        {fields.map((f, index) => (
          <li key={f.id}>
            <Controller
              control={control}
              name={`votes.${index}`}
              render={({ field, fieldState }) => {
                return (
                  <li className={"flex items-start justify-between gap-3"}>
                    <Typography variant={"body-s-bold"} className={"pt-1 text-spaceBlue-200"}>
                      {f.criteria}
                    </Typography>
                    <div className={"shrink-0"}>
                      <DustScore
                        initialScore={f.vote ?? 0}
                        onScoreChange={vote =>
                          setValue(
                            `votes.${index}`,
                            {
                              ...field.value,
                              vote,
                            },
                            { shouldDirty: true, shouldValidate: true }
                          )
                        }
                        isSmall
                      />
                    </div>
                    {fieldState.error?.message}
                  </li>
                );
              }}
            />
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
          disabled={!formState.isValid}
        >
          {/*{isPending ? <Spinner className="h-4 w-4" /> : <Icon remixName={"ri-check-line"} size={24} />}{" "}*/}
          {T("v2.commons.form.submit")}
        </Button>
      </footer>
    </form>
  );
}
