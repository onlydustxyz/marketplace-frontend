use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	contributions,
	projects::add_lead_contributor,
	starknet::{accounts::accounts, Account},
};
use rstest::*;

// Lead contributors must not overlap between different scenario
// otherwise their will consume the same call nonces
const LEAD_CONTRIBUTOR_INDEX: usize = 1;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(accounts: [Account; 10]) {
	let issue_number = 31;
	let lead_contributor = &accounts[LEAD_CONTRIBUTOR_INDEX];
	add_lead_contributor(&accounts[0], STARKONQUEST_ID, lead_contributor.address()).await;

	// Create a new contribution
	contributions::create(lead_contributor, STARKONQUEST_ID, issue_number, 0).await;
	wait_for_events().await;

	let contribution = contributions::get_contribution_by_issue_number(issue_number)
		.await
		.expect("Contribution not found in db");
	assert_eq!(contribution.status, "OPEN");

	// Apply to the contribution
	let contribution_id =
		u64::from_str_radix(contribution.id.trim_start_matches("0x"), 16).unwrap();
	let contributor_id = String::from("0x29");
	contributions::apply(contribution_id, &contributor_id).await;

	contributions::refuse_application(&contribution.id, &contributor_id).await;

	// TODO restore when user registration can be tested in local
	// Get the contributor
	/*
	let contributor = contributors::get::get(contributor_account.clone()).await;
	assert_eq!(contributor.id, contributor_account);
	assert_eq!(contributor.account, contributor_account);
	assert_eq!(contributor.github_identifier, "");
	assert_eq!(contributor.github_username, "");

	let contributor = contributors::get::get_by_account(
		"0x0265a2d2ac0c9c95aef8e489b9046a700f9b1d1488a9922fe3b0f9a6f6ddd3b5".to_string(),
	)
	.await;
	assert_eq!(contributor.id, "0x0029");
	let contributor = contributors::get::get(contributor_id.clone()).await;
	assert_eq!(contributor.id, contributor_id);
	assert_eq!(
		contributor.account,
		"0x0265a2d2ac0c9c95aef8e489b9046a700f9b1d1488a9922fe3b0f9a6f6ddd3b5"
	);
	assert_eq!(contributor.github_identifier, "990474");
	assert_eq!(contributor.github_username, "abuisset");
	*/
}
