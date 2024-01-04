import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import ProjectsLoader from "../../../src/App/Loaders/ProjectsLoader";

export default function AuthenticationGuard({ component }: { component: React.ReactNode }) {
  const Component = withAuthenticationRequired(component as unknown as ComponentType<object>, {
    onRedirecting: () => <ProjectsLoader />,
  });

  return <Component />;
}
