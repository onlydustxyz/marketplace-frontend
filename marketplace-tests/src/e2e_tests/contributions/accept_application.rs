use crate::e2e_tests::starknet::{Account, ContractAdministrator, ContributionsContract};

pub async fn assign_contributor_to_contribution(
	account: &Account,
	contribution_id: &str,
	contributor_id: &str,
) {
	println!(
		"Acceptiong application to contribution {contribution_id} for contributor {contributor_id}"
	);
	let contributions_contract = ContractAdministrator::new(account);
	contributions_contract
		.assign_contributor_to_contribution(contribution_id, contributor_id)
		.await
		.expect("Unable to create a contribution");
}
