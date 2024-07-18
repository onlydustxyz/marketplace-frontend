import { HackathonStoragePort } from "core/domain/hackathon/outputs/hackathon-storage-port";
import { FirstParameter } from "core/helpers/types";

export class HackathonClientAdapterMock implements HackathonStoragePort {
  constructor() {}

  routes = {};

  getHackathons = () => {
    return {
      request: () => Promise.resolve({}),

      tag: "",
    } as ReturnType<HackathonStoragePort["getHackathons"]>;
  };

  getHackathonBySlug = (_: FirstParameter<HackathonStoragePort["getHackathonBySlug"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<HackathonStoragePort["getHackathonBySlug"]>;
  };

  getHackathonByIdProjectIssues = (_: FirstParameter<HackathonStoragePort["getHackathonByIdProjectIssues"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<HackathonStoragePort["getHackathonByIdProjectIssues"]>;
  };
}
