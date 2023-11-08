import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import config from "src/config";

export const LOGIN_URL = `${config.LOGIN_URL}?redirect_url=${encodeURI(window.location.origin)}`;

export default function SubmitProject() {
  const { T } = useIntl();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const dispatchSession = useSessionDispatch();

  const startProjectCreation = () => {
    if (isLoggedIn) {
      navigate(RoutePaths.ProjectCreation);
    } else {
      dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: RoutePaths.ProjectCreation });
      window.location.replace(LOGIN_URL);
    }
  };

  return (
    <Card className="mb-4 flex h-fit flex-row gap-4 p-6">
      <div className="flex-1 text-sm leading-4">{T("project.details.create.description")}</div>
      <Button
        htmlType="submit"
        size={ButtonSize.Sm}
        type={ButtonType.Primary}
        width={Width.Fit}
        onClick={() => startProjectCreation()}
      >
        <i className="ri-magic-line" />
        {T("project.details.create.submit.button")}
      </Button>
    </Card>
  );
}
