import { sleep } from "k6";
import { getProjects, getFilterOptions, getProject, getContributors } from "./common.js";

const stages100By100 = [
  { duration: "10s", target: 100 },
  { duration: "20s", target: 100 },
  { duration: "10s", target: 200 },
  { duration: "20s", target: 200 },
  { duration: "10s", target: 300 },
  { duration: "20s", target: 300 },
  { duration: "10s", target: 400 },
  { duration: "20s", target: 400 },
  { duration: "10s", target: 500 },
  { duration: "20s", target: 500 },
  { duration: "10s", target: 600 },
  { duration: "20s", target: 600 },
  { duration: "10s", target: 700 },
  { duration: "20s", target: 700 },
  { duration: "10s", target: 800 },
  { duration: "20s", target: 800 },
  { duration: "10s", target: 900 },
  { duration: "20s", target: 900 },
  { duration: "10s", target: 1000 },
  { duration: "20s", target: 1000 },
  { duration: "10s", target: 0 },
];

export const options = {
  noConnectionReuse: true,
  stages: stages100By100,

  // Thresholds are the pass/fail criteria that you define for your test metrics.
  // If the performance of the system under test (SUT) does not meet the conditions
  // of your threshold, the test will finish with a failed status.
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ["p(90) < 400", "p(95) < 800", "p(99.9) < 2000"],
    // During the whole test execution, the error rate must be lower than 0.1%.
    http_req_failed: ["rate<0.001"],
  },
};

const unauthenticatedUserHeaders = {
  "Content-Type": "application/json",
  "x-hasura-role": "public",
};

const PROJECT_ID = "6239cb20-eece-466a-80a0-742c1071dd3c";

export default function () {
  getProjects(unauthenticatedUserHeaders);
  getFilterOptions(unauthenticatedUserHeaders);
  //getProjects(unauthenticatedUserHeaders);

  // wait before "going" to the project details page
  sleep(2);
  getProject(PROJECT_ID, unauthenticatedUserHeaders);
  //getProject(PROJECT_ID, unauthenticatedUserHeaders);

  // wait before "going" to the project contributors page
  sleep(1);
  getContributors(PROJECT_ID, unauthenticatedUserHeaders);

  // wait before next iteration
  sleep(3);
}
