mod applications;
mod contributions;
mod contributors;
mod projects;
mod starknet;
mod utils;

use ::starknet::core::types::FieldElement;
use rstest::*;
use std::{collections::VecDeque, thread, time::Duration};

use self::starknet::accounts::*;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(accounts: [starknet::Account; 10]) {
	let mut accounts = VecDeque::from(accounts);
	let admin = accounts.pop_front().unwrap();
	let lead_contributor = accounts.pop_front().unwrap();
	let contributor = accounts.pop_front().unwrap();

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
	assert_eq!(contribution.status, "COMPLETED");

	// Apply to the contribution
	let contributor_account = format!("{:#x}", contributor.address());
	contributions::apply("0x0001", &contributor_account).await;

	contributions::refuse_application("0x0001", &contributor_account).await;

	// Get the contributor
	let contributor = contributors::get::get(contributor_account.clone()).await;
	assert_eq!(contributor.id, contributor_account);
	assert_eq!(contributor.account, contributor_account);
	assert_eq!(contributor.github_identifier, ""); // TODO fill when user registration can be tested in local
	assert_eq!(contributor.github_username, "");

	// TODO fill when user registration can be tested in local
	/*
	let contributor = contributors::get::get_by_account(
		"0x0265a2d2ac0c9c95aef8e489b9046a700f9b1d1488a9922fe3b0f9a6f6ddd3b5".to_string(),
	)
	.await;
	assert_eq!(contributor.id, "0x0029");
	*/
}

#[rstest]
#[tokio::test]
async fn contact_information(accounts: [starknet::Account; 10]) {
	let contributor_account = format!("{:#x}", accounts[0].address());

	contributors::contact_information::add(&contributor_account, Some(String::from("discord")))
		.await;
	let contact_info = contributors::contact_information::get(&contributor_account).await;
	assert_eq!(
		FieldElement::from_hex_be(&contact_info.contributor_id).unwrap(),
		FieldElement::from_hex_be(&contributor_account).unwrap()
	);
	assert_eq!(contact_info.discord_handle.unwrap(), "discord");
}

async fn wait_for_events() {
	tokio::task::spawn(async { thread::sleep(Duration::from_secs(3)) })
		.await
		.unwrap();
}
