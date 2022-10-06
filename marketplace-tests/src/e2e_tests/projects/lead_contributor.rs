use starknet::core::types::FieldElement;

use crate::e2e_tests::starknet::{Account, ContractAdministrator, ContributionsContract};

pub async fn add_lead_contributor(
	account: &Account,
	project_id: u64,
	contributor_account_address: FieldElement,
) {
	ContractAdministrator::new(account)
		.add_lead_contributor_for_project(project_id, contributor_account_address)
		.await
		.expect("Unable to grant lead contributor role");
}
