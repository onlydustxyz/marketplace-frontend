mod applications;
mod contributions;
mod contributors;
mod projects;
mod utils;

use dotenv::dotenv;
use rstest::*;

#[rstest]
#[tokio::test]
async fn e2e_tests() {
	refresh_all().await;

	// List all projects
	let all_projects = projects::list().await;

	// Find a project by name and a completed contribution to make sure we have retrieved data
	let starkonquest = projects::find_by_title(&all_projects, "starkonquest")
		.expect("Project not found in list of all projects");

	let contribution = contributions::find_by_id(&starkonquest, "0x0030".to_string())
		.expect("Contribution not found in project");
	assert_eq!(contribution.status, "COMPLETED");

	// Add some contact information
	contributors::contact_information::add(123, Some(String::from("discord"))).await;
	let contact_info = contributors::contact_information::get(123).await;
	assert_eq!(contact_info.contributor_id, "0x007b");
	assert_eq!(contact_info.discord_handle.unwrap(), "discord");

	// Find an available contribution and apply to it
	let contribution = projects::find_open_contribution(&all_projects)
		.expect("No open contribution to perform the test, please change the data dump");
	contributions::apply(contribution.id.clone(), String::from("0x29")).await;

	contributions::refuse_application(contribution.id, String::from("0x29")).await;
}

async fn refresh_all() {
	dotenv().ok();

	projects::refresh().await;
	contributions::refresh().await;
	applications::refresh().await;
	contributors::refresh().await;
}
