use crate::e2e_tests::starknet::{Account, ContractAdministrator, ContributionsContract};

pub async fn assign_contributor_to_contribution(
	account: &Account,
	contribution_id: &str,
	contributor_account_address: &str,
) {
	println!(
		"Accepting application to contribution {contribution_id} for contributor {contributor_account_address}"
	);
	let contributions_contract = ContractAdministrator::new(account);
	contributions_contract
		.assign_contributor_to_contribution(contribution_id, contributor_account_address)
		.await
		.expect("Unable to create a contribution");
}
