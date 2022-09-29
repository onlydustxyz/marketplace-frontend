use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	contributions,
	projects::add_lead_contributor,
	starknet::{accounts::accounts, Account},
};
use rstest::*;

// Lead contributors must not overlap between different scenario
// otherwise their will consume the same call nonces
const LEAD_CONTRIBUTOR_INDEX: usize = 2;

#[rstest]
#[tokio::test]
async fn delete_contribution(accounts: [Account; 10]) {
	let lead_contributor = &accounts[LEAD_CONTRIBUTOR_INDEX];
	let issue_number = 32;
	add_lead_contributor(&accounts[0], STARKONQUEST_ID, lead_contributor.address()).await;

	contributions::create(lead_contributor, STARKONQUEST_ID, issue_number, 0).await;
	wait_for_events().await;

	let contribution = contributions::get_contribution_by_issue_number(issue_number)
		.await
		.expect("Contribution not found in db");

	let contribution_id =
		u64::from_str_radix(contribution.id.trim_start_matches("0x"), 16).unwrap();
	let contributor_id = String::from("0x29");
	contributions::apply(contribution_id, &contributor_id).await;
	contributions::delete(lead_contributor, contribution_id).await;
	wait_for_events().await;

	let contribution = contributions::get_contribution_by_issue_number(issue_number)
		.await
		.expect("Contribution not found in project");
	assert_eq!(&contribution.status, "ABANDONED");
}
