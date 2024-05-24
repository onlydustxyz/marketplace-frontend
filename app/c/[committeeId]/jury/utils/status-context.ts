import { MyCommitteeAssignmentsResponse } from "api-client/resources/me/types";
import { createContext } from "react";

export const StatusContext = createContext<MyCommitteeAssignmentsResponse["status"] | "">("");
