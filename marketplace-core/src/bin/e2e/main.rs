use log::info;
use reqwest::StatusCode;
use std::{fs::read_to_string, str::FromStr, thread, time::Duration};

mod projects;
use projects::*;

mod utils;
use utils::*;

mod contribution;
use contribution::*;

mod contact_information;
use contact_information::*;

const DATA_PATH: &str = "marketplace-core/src/bin/e2e/data";

#[tokio::main]
async fn main() {
	add_all_projects().await;

	let starkonquest = find_project_by_title(&list_all_projects().await, "starkonquest")
		.expect("Project not found in list of all projects");
	let starkonquest_id: u64 = starkonquest.id.parse().expect("starkonquest id is not a number");

	const ISSUE_NUMBER: u64 = 51;
	add_contribution(ISSUE_NUMBER, starkonquest_id, 0, "0x123").await;

	wait_for_result(format!("{DATA_PATH}/contributions_open.json")).await;

	let starkonquest = find_project_by_title(&list_all_projects().await, "starkonquest")
		.expect("Project not found in list of all projects");
	let contribution =
		find_contribution_by_onchain_id(&starkonquest, starkonquest_id * 1_000_000 + ISSUE_NUMBER)
			.expect("Contribution not found in project");

	let contribution_id =
		uuid::Uuid::from_str(&contribution.id).expect("contribution id is not a valid uuid");

	const CONTRIBUTOR_ID: u128 = 123;
	let discord_handle = String::from("discord");

	add_contact_information(CONTRIBUTOR_ID, Some(String::from("discord"))).await;

	let contact_info = get_contact_information(CONTRIBUTOR_ID).await;
	assert_eq!(contact_info.contributor_id, "0x007b");
	assert_eq!(contact_info.discord_handle.unwrap(), discord_handle);

	assign_contribution(contribution_id, CONTRIBUTOR_ID).await;

	wait_for_result(format!("{DATA_PATH}/contributions_assigned.json")).await;

	validate_contribution(contribution_id).await;

	wait_for_result(format!("{DATA_PATH}/contributions_validated.json")).await;
}

async fn add_all_projects() {
	add_project("onlydustxyz", "starkonquest").await;
	add_project("onlydustxyz", "starklings").await;
}

async fn wait_for_result(result_file_path: String) {
	for i in 0..10 {
		println!("LOOP {i}");

		let cloned_result_file_path = result_file_path.clone();
		let handle = tokio::spawn(async move {
			compare_projects_to_expected(
				list_all_projects().await,
				serde_json::from_str(&read_to_string(&cloned_result_file_path).unwrap()).unwrap(),
			);
		});

		match tokio::join!(handle).0 {
			Ok(_) => {
				info!("Success");
				return;
			},
			Err(_) => {
				thread::sleep(Duration::from_secs(3));
			},
		}
	}

	println!("End to end test failed");
	panic!("Result does not match with {result_file_path}");
}
