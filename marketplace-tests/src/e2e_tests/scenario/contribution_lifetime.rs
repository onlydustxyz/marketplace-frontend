use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	backends::{marketplace_api, marketplace_event_store, marketplace_indexer},
	contributions, contributors,
	database::get_events_count,
	projects::add_lead_contributor,
	scenario::STARKONQUEST_TITLE,
	starknet::{accounts::accounts, Account},
};
use rstest::*;
use tokio::task::JoinHandle;

// Lead contributors must not overlap between different scenario
// otherwise their will consume the same call nonces
const LEAD_CONTRIBUTOR_INDEX: usize = 1;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(
	accounts: [Account; 10],
	#[future] marketplace_api: JoinHandle<()>,
	#[future] marketplace_indexer: JoinHandle<()>,
	#[future] marketplace_event_store: JoinHandle<()>,
) {
	marketplace_api.await;
	marketplace_indexer.await;
	marketplace_event_store.await;

	let events_count = get_events_count();

	let issue_number = 31;
	let admin_account = &accounts[0];
	let lead_contributor = &accounts[LEAD_CONTRIBUTOR_INDEX];
	let contributor_account = &accounts[2];
	let contributor_account_address = format!("{:#066x}", contributor_account.address());

	add_lead_contributor(admin_account, STARKONQUEST_ID, lead_contributor.address()).await;
	// Create a new contribution
	contributions::create(lead_contributor, STARKONQUEST_ID, issue_number, 0).await;
	wait_for_events(events_count + 3).await;

	let contribution =
		contributions::get_project_contribution_by_issue_number(STARKONQUEST_TITLE, issue_number)
			.await
			.expect("Contribution not found in db");
	assert_eq!(contribution.status, "OPEN");

	// Apply to the contribution
	contributors::signup(contributor_account).await;
	contributions::apply(&contribution.id, &contributor_account_address).await;
	contributions::refuse_application(&contribution.id, &contributor_account_address).await;

	let contributor = contributors::get_by_account(&contributor_account_address).await;
	assert_eq!(contributor.id, contributor_account_address);
	assert_eq!(contributor.account, contributor_account_address);
	assert_eq!(contributor.github_identifier, "990474");
	assert_eq!(contributor.github_username, "abuisset");
	let contributor = contributors::get(&contributor_account_address).await;
	assert_eq!(contributor.id, contributor_account_address);
	assert_eq!(contributor.account, contributor_account_address);
	assert_eq!(contributor.github_identifier, "990474");
	assert_eq!(contributor.github_username, "abuisset");

	let events_count = get_events_count();
	contributions::apply(&contribution.id, &contributor_account_address).await;
	contributions::assign_contributor_to_contribution(
		lead_contributor,
		&contribution.id,
		&contributor_account_address,
	)
	.await;
	wait_for_events(events_count + 2).await;
	let found_contributions = contributions::get().await;
	assert_eq!(found_contributions.len(), 1);
	assert_eq!(found_contributions[0].id, contribution.id);
}
