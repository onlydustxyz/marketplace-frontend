import { TReadOnlyQuestions } from "app/(v1)/c/[committeeId]/components/read-only-questions/read-only-questions.types";

import { Typography } from "components/layout/typography/typography";

export function ReadOnlyQuestions({ questions }: TReadOnlyQuestions.Props) {
  if (!questions.length) return null;

  return (
    <section className="grid gap-10">
      <ul className="flex flex-col gap-6">
        {questions.map(question => (
          <li key={question.id} className="flex flex-col gap-3">
            <Typography variant={"body-s"} className="text-spaceBlue-200">
              {question.question}
            </Typography>
            <Typography variant={"body-s"} className="break-all">
              {question.answer ?? "--"}
            </Typography>
          </li>
        ))}
      </ul>
    </section>
  );
}
