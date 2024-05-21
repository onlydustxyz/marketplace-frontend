import { z } from "zod";

export namespace TPrivatePage {
  export const validation = z.object({
    projectId: z.string().min(1),
    questions: z.array(
      z
        .object({
          id: z.string().min(1),
          question: z.string().min(1),
          answer: z.string().optional(),
          required: z.boolean(),
        })
        .superRefine(({ answer, required }, ctx) => {
          if (required && answer?.length === 0) {
            ctx.addIssue({
              code: "custom",
              message: "The passwords did not match",
              path: ["confirmPassword"],
            });
          }
        })
    ),
  });

  export type form = z.infer<typeof validation>;
}
