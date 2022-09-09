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

	let all_projects = projects::list().await;

	let starkonquest = projects::find_by_title(&all_projects, "starkonquest")
		.expect("Project not found in list of all projects");

	let contribution = contributions::find_by_id(&starkonquest, "0x0030".to_string())
		.expect("Contribution not found in project");
	assert_eq!(contribution.status, "COMPLETED");

	contributors::contact_information::add(123, Some(String::from("discord"))).await;
	let contact_info = contributors::contact_information::get(123).await;
	assert_eq!(contact_info.contributor_id, "0x007b");
	assert_eq!(contact_info.discord_handle.unwrap(), "discord");
}

async fn refresh_all() {
	dotenv().ok();

	projects::refresh().await;
	contributions::refresh().await;
	applications::refresh().await;
	contributors::refresh().await;
}
