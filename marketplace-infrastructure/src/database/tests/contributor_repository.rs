use std::str::FromStr;

use crate::database::Client;
use marketplace_domain::{
	ContributorDiscordHandle, ContributorProfile, ContributorProjectionRepository, GithubUserId,
};
use marketplace_tests::init_pool;
use rstest::*;
use uuid::Uuid;

#[fixture]
fn database() -> Client {
	Client::new(init_pool())
}

#[fixture]
fn user_id() -> Uuid {
	Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
}

#[fixture]
fn github_identifier() -> GithubUserId {
	990474
}

#[fixture]
fn github_username() -> String {
	String::from("abuisset")
}

#[fixture]
fn discord_handle() -> ContributorDiscordHandle {
	ContributorDiscordHandle::from("Antho#9314")
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn github_then_discord(
	database: Client,
	user_id: Uuid,
	github_identifier: GithubUserId,
	github_username: String,
	discord_handle: ContributorDiscordHandle,
) {
	{
		let contributor = ContributorProfile {
			id: user_id.clone(),
			github_identifier: Some(github_identifier),
			github_username: Some(github_username.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_github_user_data(&database, contributor)
			.expect("Unable to upsert contributor profile");
	}

	{
		let contributor = ContributorProfile {
			id: user_id.clone(),
			discord_handle: Some(discord_handle.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_discord_handle(&database, contributor)
			.expect("Unable to upsert contributor discord handle");
	}

	let contributor = ContributorProjectionRepository::find_by_id(&database, &user_id)
		.expect("Unable to find contributor by account");

	assert_eq!(contributor.github_identifier, Some(github_identifier));
	assert_eq!(contributor.github_username, Some(github_username));
	assert_eq!(contributor.discord_handle, Some(discord_handle));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn discord_then_github(
	database: Client,
	user_id: Uuid,
	github_identifier: GithubUserId,
	github_username: String,
	discord_handle: ContributorDiscordHandle,
) {
	{
		let contributor = ContributorProfile {
			id: user_id.clone(),
			discord_handle: Some(discord_handle.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_discord_handle(&database, contributor)
			.expect("Unable to upsert contributor discord handle");
	}

	{
		let contributor = ContributorProfile {
			id: user_id.clone(),
			github_identifier: Some(github_identifier),
			github_username: Some(github_username.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_github_user_data(&database, contributor)
			.expect("Unable to upsert contributor profile");
	}

	let contributor = ContributorProjectionRepository::find_by_id(&database, &user_id)
		.expect("Unable to find contributor by account");

	assert_eq!(contributor.github_identifier, Some(github_identifier));
	assert_eq!(contributor.github_username, Some(github_username));
	assert_eq!(contributor.discord_handle, Some(discord_handle));
}
