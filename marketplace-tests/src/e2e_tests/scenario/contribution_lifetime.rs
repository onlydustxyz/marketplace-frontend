use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	backends::{marketplace_api, marketplace_indexer},
	contributions, contributors,
	database::events_count,
	projects::add_lead_contributor,
	scenario::STARKONQUEST_TITLE,
	starknet::{accounts::accounts, Account},
};
use rstest::*;

// Lead contributors must not overlap between different scenario
// otherwise their will consume the same call nonces
const LEAD_CONTRIBUTOR_INDEX: usize = 1;

#[rstest]
#[tokio::test]
async fn contribution_lifetime(
	accounts: [Account; 10],
	#[future] marketplace_api: tokio::task::JoinHandle<()>,
	#[future] marketplace_indexer: tokio::task::JoinHandle<()>,
) {
	marketplace_api.await;
	marketplace_indexer.await;

	let events_count = events_count();

	let issue_number = 31;
	let lead_contributor = &accounts[LEAD_CONTRIBUTOR_INDEX];
	let contributor_account = &accounts[2];
	let contributor_address = format!("{:#066x}", contributor_account.address());

	add_lead_contributor(&accounts[0], STARKONQUEST_ID, lead_contributor.address()).await;
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
	contributions::apply(&contribution.id, &contributor_address).await;
	contributions::refuse_application(&contribution.id, &contributor_address).await;

	let contributor = contributors::get_by_account(&contributor_address).await;
	assert_eq!(contributor.id, contributor_address);
	assert_eq!(contributor.account, contributor_address);
	assert_eq!(contributor.github_identifier, "990474");
	assert_eq!(contributor.github_username, "abuisset");
	let contributor = contributors::get(&contributor_address).await;
	assert_eq!(contributor.id, contributor_address);
	assert_eq!(contributor.account, contributor_address);
	assert_eq!(contributor.github_identifier, "990474");
	assert_eq!(contributor.github_username, "abuisset");
}
