use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	backends::{event_listeners, marketplace_api, marketplace_event_store, marketplace_indexer},
	contributions, contributors,
	database::get_events_count,
	projects::add_lead_contributor,
	scenario::STARKONQUEST_TITLE,
	starknet::{accounts::*, Account},
};
use anyhow::Result;
use rstest::*;
use tokio::task::JoinHandle;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(
	admin_account: Account,
	lead_contributor_account: Account,
	contributor_account: Account,
	#[future] marketplace_api: JoinHandle<Result<()>>,
	#[future] marketplace_indexer: JoinHandle<Result<()>>,
	#[future] marketplace_event_store: JoinHandle<Result<()>>,
	#[future] event_listeners: JoinHandle<Result<()>>,
) {
	marketplace_api.await;
	marketplace_indexer.await;
	marketplace_event_store.await;
	event_listeners.await;

	let events_count = get_events_count();

	let issue_number = 31;
	let contributor_account_address = format!("{:#066x}", contributor_account.address());

	add_lead_contributor(
		&admin_account,
		STARKONQUEST_ID,
		lead_contributor_account.address(),
	)
	.await;
	// Create a new contribution
	contributions::create(&lead_contributor_account, STARKONQUEST_ID, issue_number, 0).await;
	wait_for_events(events_count + 3).await;

	let contribution =
		contributions::get_project_contribution_by_issue_number(STARKONQUEST_TITLE, issue_number)
			.await
			.expect("Contribution not found in db");
	assert_eq!(contribution.status, "OPEN");

	// Apply to the contribution
	contributors::signup(&contributor_account).await;
	contributors::register_discord_handle(&contributor_account_address, "Discord#1234").await;
	contributions::apply(&contribution.id, &contributor_account_address).await;
	contributions::refuse_application(&contribution.id, &contributor_account_address).await;

	let contributor = contributors::get_by_account(&contributor_account_address).await;
	assert_eq!(contributor.id, contributor_account_address);
	assert_eq!(contributor.account, contributor_account_address);
	assert_eq!(contributor.github_identifier.unwrap(), "990474");
	assert_eq!(contributor.github_username.unwrap(), "abuisset");
	assert_eq!(contributor.discord_handle.unwrap(), "Discord#1234");

	let contributor = contributors::get(&contributor_account_address).await;
	assert_eq!(contributor.id, contributor_account_address);
	assert_eq!(contributor.account, contributor_account_address);
	assert_eq!(contributor.github_identifier.unwrap(), "990474");
	assert_eq!(contributor.github_username.unwrap(), "abuisset");

	let events_count = get_events_count();
	contributions::apply(&contribution.id, &contributor_account_address).await;
	contributions::assign_contributor_to_contribution(
		&lead_contributor_account,
		&contribution.id,
		&contributor_account_address,
	)
	.await;
	wait_for_events(events_count + 2).await;
	let found_contributions = contributions::get().await;
	assert_eq!(found_contributions.len(), 1);
	assert_eq!(found_contributions[0].id, contribution.id);
}
