use crate::e2e_tests::starknet::{Account, ContractAdministrator, ContributionsContract};

pub async fn create(account: &Account, project_id: u64, issue_number: u64, gate: u64) {
	let contributions_contract = ContractAdministrator::new(account);
	contributions_contract
		.new_contribution(project_id, issue_number, gate)
		.await
		.expect("Unable to create a contribution");
}
