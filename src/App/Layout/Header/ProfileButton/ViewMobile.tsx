import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { cn } from "src/utils/cn";

import { TUseMenu } from "hooks/menu/use-menu/use-menu.types";

interface Props extends TUseMenu.Return {
  avatarUrl: string | null;
  login: string;
  githubUserId?: number;
}

export function ViewMobile({ avatarUrl, login, errorColor, error }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border border-greyscale-50/12 p-1.5 font-walsheim text-sm",
        {
          "border-orange-500": errorColor === TUseMenu.ERROR_COLORS.WARNING,
          "border-github-red": errorColor === TUseMenu.ERROR_COLORS.ERROR,
        }
      )}
    >
      {avatarUrl && <img className="h-8 w-8 rounded-full" src={avatarUrl} loading="lazy" alt={login} />}
      {error && (
        <ErrorWarningLine
          className={cn("text-xl text-spaceBlue-200", {
            "text-orange-500": errorColor === TUseMenu.ERROR_COLORS.WARNING,
            "text-github-red": errorColor === TUseMenu.ERROR_COLORS.ERROR,
          })}
        />
      )}
    </div>
  );
}
