import { components } from "src/__generated/api";

// make this to ensure that the keys are linked to backend contracts
const NotificationType: { [key in components["schemas"]["NotificationPageItemResponse"]["type"]]: string } = {
  MAINTAINER_APPLICATION_TO_REVIEW: "MAINTAINER_APPLICATION_TO_REVIEW",
  MAINTAINER_COMMITTEE_APPLICATION_CREATED: "MAINTAINER_COMMITTEE_APPLICATION_CREATED",
} as const;

type _NotificationResponse = components["schemas"]["NotificationPageItemResponse"];

export interface NotificationResponse extends _NotificationResponse {
  type: keyof typeof NotificationType;
}

export interface NotificationInterface {
  getTitle(): string | undefined;
  getDescription(): string | undefined;
  getUrl(): string | undefined;
  getId(): string;
}
