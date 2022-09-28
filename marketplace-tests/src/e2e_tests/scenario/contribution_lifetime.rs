use super::wait_for_events;
use crate::e2e_tests::{
	contributions, projects,
	starknet::{accounts::accounts, Account},
};
use rstest::*;
use std::collections::VecDeque;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(accounts: [Account; 10]) {
	let mut accounts = VecDeque::from(accounts);
	let admin = accounts.pop_front().unwrap();
	let lead_contributor = accounts.pop_front().unwrap();

	const STARKONQUEST: u64 = 481932781;

	// grant lead contributor role
	projects::add_lead_contributor(&admin, STARKONQUEST, lead_contributor.address()).await;

	// Create a new contribution
	contributions::create(&lead_contributor, STARKONQUEST, 31, 0).await;

	wait_for_events().await;

	// List all projects
	let all_projects = projects::list().await;

	// Find a project by name and a completed contribution to make sure we have retrieved data
	let starkonquest = projects::find_by_title(&all_projects, "starkonquest")
		.expect("Project not found in list of all projects");

	let contribution = contributions::find_by_id(&starkonquest, "0x0001".to_string())
		.expect("Contribution not found in project");
	assert_eq!(contribution.status, "OPEN");

	// Apply to the contribution
	let contributor_id = String::from("0x29");
	contributions::apply("0x0001", &contributor_id).await;

	contributions::refuse_application("0x0001", &contributor_id).await;

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
