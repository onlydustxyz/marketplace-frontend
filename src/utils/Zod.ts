import { z } from "zod";

export namespace ZodUtils {
  export const ErrorMapToMessage = (message: string, invalidMessage?: string): { errorMap: z.ZodErrorMap } => {
    return {
      errorMap: issue => {
        if (invalidMessage) {
          if (issue.code === z.ZodIssueCode.invalid_type) {
            return { message: invalidMessage };
          }
        }

        return { message };
      },
    };
  };
}
