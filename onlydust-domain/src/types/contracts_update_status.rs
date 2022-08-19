use crate::ContributionId;

pub struct ContractUpdateStatus {
	pub contribution_id: ContributionId,
	pub transaction_hash: String,
}

impl ContractUpdateStatus {
	pub fn new(contribution_id: ContributionId, transaction_hash: String) -> Self {
		ContractUpdateStatus {
			contribution_id,
			transaction_hash,
		}
	}
}
