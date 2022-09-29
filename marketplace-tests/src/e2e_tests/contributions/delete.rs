use crate::e2e_tests::starknet::{Account, ContractAdministrator, ContributionsContract};

pub async fn delete(account: &Account, contribution_id: u64) {
	let contributions_contract = ContractAdministrator::new(account);
	contributions_contract
		.delete_contribution(contribution_id)
		.await
		.expect("Unable to create a contribution");
}
