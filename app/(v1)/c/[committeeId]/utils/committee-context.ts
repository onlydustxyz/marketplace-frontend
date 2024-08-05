import { MyCommitteeAssignmentsResponse } from "api-client/resources/me/types";
import { createContext } from "react";

export const CommitteeContext = createContext<Partial<{ status: MyCommitteeAssignmentsResponse["status"] }>>({});
