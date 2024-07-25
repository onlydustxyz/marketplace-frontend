import React from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

function LoginPage() {
  return (
    <SignupTemplate
      header={
        <div className="flex w-full flex-row justify-between gap-1">
          <p className="text-2xl font-bold">Login</p>
          <Button variant={"secondary-light"}>Close</Button>
        </div>
      }
      footer={
        <div className="flex w-full flex-row justify-end gap-2">
          <Button variant={"secondary-light"}>Back</Button>
          <Button>Next</Button>
        </div>
      }
    >
      <div className={"flex flex-col gap-3"}>
        <Paper container="2" classNames={{ base: "h-10" }} />
        <Paper container="2" classNames={{ base: "h-56" }} />
        <Paper container="2" classNames={{ base: "h-32" }} />
        <Paper container="2" classNames={{ base: "h-[900px]" }} />
      </div>
    </SignupTemplate>
  );
}

export default LoginPage;
