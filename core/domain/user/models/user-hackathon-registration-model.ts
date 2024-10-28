import { components } from "src/__generated/api";

export type UserHackathonRegistrationResponse = components["schemas"]["HackathonRegistrationResponse"];

export interface UserHackathonRegistrationInterface extends UserHackathonRegistrationResponse {}

export class UserHackathonRegistration implements UserHackathonRegistrationInterface {
  isRegistered!: UserHackathonRegistrationResponse["isRegistered"];

  constructor(props: UserHackathonRegistrationResponse) {
    Object.assign(this, props);
  }
}
