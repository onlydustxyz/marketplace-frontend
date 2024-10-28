import { components } from "src/__generated/api";

export type RewardListItemResponse = components["schemas"]["RewardPageItemResponse"];

export interface RewardListItemInterface extends RewardListItemResponse {}

export class RewardListItem implements RewardListItemInterface {
  amount!: RewardListItemResponse["amount"];
  from!: RewardListItemResponse["from"];
  id!: RewardListItemResponse["id"];
  processedAt!: RewardListItemResponse["processedAt"];
  project!: RewardListItemResponse["project"];
  requestedAt!: RewardListItemResponse["requestedAt"];
  status!: RewardListItemResponse["status"];
  to!: RewardListItemResponse["to"];
  unlockDate!: RewardListItemResponse["unlockDate"];

  constructor(props: RewardListItemResponse) {
    Object.assign(this, props);
  }
}
