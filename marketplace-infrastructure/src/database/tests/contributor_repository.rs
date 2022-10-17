use crate::database::Client;
use marketplace_domain::{
	ContributorAccountAddress, ContributorDiscordHandle, ContributorProfile,
	ContributorProjectionRepository, GithubUserId,
};
use marketplace_tests::init_pool;
use rstest::*;

#[fixture]
fn database() -> Client {
	Client::new(init_pool())
}

#[fixture]
fn contributor_account_address() -> ContributorAccountAddress {
	"0x069642afc7c2359888f3e8e6c935662b126b2a0ac6c12ca754861d54b4c17556"
		.parse()
		.unwrap()
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
	contributor_account_address: ContributorAccountAddress,
	github_identifier: GithubUserId,
	github_username: String,
	discord_handle: ContributorDiscordHandle,
) {
	{
		let contributor = ContributorProfile {
			id: contributor_account_address.clone(),
			account: contributor_account_address.clone(),
			github_identifier,
			github_username: github_username.clone(),
			..Default::default()
		};

		ContributorProjectionRepository::upsert(&database, contributor.clone())
			.expect("Unable to upsert contributor profile");
	}

	{
		let contributor = ContributorProfile {
			id: contributor_account_address.clone(),
			account: contributor_account_address.clone(),
			discord_handle: Some(discord_handle.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_discord_handle(&database, contributor.clone())
			.expect("Unable to upsert contributor discord handle");
	}

	let contributor = ContributorProjectionRepository::find_by_account_address(
		&database,
		&contributor_account_address,
	)
	.expect("Unable to find contributor by account");

	assert_eq!(contributor.github_identifier, github_identifier);
	assert_eq!(contributor.github_username, github_username);
	assert_eq!(contributor.discord_handle, Some(discord_handle));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn discord_then_github(
	database: Client,
	contributor_account_address: ContributorAccountAddress,
	github_identifier: GithubUserId,
	github_username: String,
	discord_handle: ContributorDiscordHandle,
) {
	{
		let contributor = ContributorProfile {
			id: contributor_account_address.clone(),
			account: contributor_account_address.clone(),
			discord_handle: Some(discord_handle.clone()),
			..Default::default()
		};

		ContributorProjectionRepository::upsert_discord_handle(&database, contributor.clone())
			.expect("Unable to upsert contributor discord handle");
	}

	{
		let contributor = ContributorProfile {
			id: contributor_account_address.clone(),
			account: contributor_account_address.clone(),
			github_identifier,
			github_username: github_username.clone(),
			..Default::default()
		};

		ContributorProjectionRepository::upsert(&database, contributor.clone())
			.expect("Unable to upsert contributor profile");
	}

	let contributor = ContributorProjectionRepository::find_by_account_address(
		&database,
		&contributor_account_address,
	)
	.expect("Unable to find contributor by account");

	assert_eq!(contributor.github_identifier, github_identifier);
	assert_eq!(contributor.github_username, github_username);
	assert_eq!(contributor.discord_handle, Some(discord_handle));
}
