use super::{wait_for_events, STARKONQUEST_ID};
use crate::e2e_tests::{
	applications,
	backends::{marketplace_api, marketplace_indexer},
	contributions,
	database::events_count,
	projects::add_lead_contributor,
	scenario::{hex_str_to_u64, STARKONQUEST_TITLE},
	starknet::{accounts::accounts, Account},
};
use marketplace_core::dto::Application;
use rstest::*;

// Lead contributors must not overlap between different scenario
// otherwise their will consume the same call nonces
const LEAD_CONTRIBUTOR_INDEX: usize = 2;

#[rstest]
#[tokio::test]
async fn delete_contribution(
	accounts: [Account; 10],
	#[future] marketplace_api: tokio::task::JoinHandle<()>,
	#[future] marketplace_indexer: tokio::task::JoinHandle<()>,
	events_count: i64,
) {
	marketplace_api.await;
	marketplace_indexer.await;

	let lead_contributor = &accounts[LEAD_CONTRIBUTOR_INDEX];
	let issue_number = 32;

	add_lead_contributor(&accounts[0], STARKONQUEST_ID, lead_contributor.address()).await;
	contributions::create(lead_contributor, STARKONQUEST_ID, issue_number, 0).await;
	wait_for_events(events_count + 2).await;

	let contribution =
		contributions::get_project_contribution_by_issue_number(STARKONQUEST_TITLE, issue_number)
			.await
			.expect("Contribution not found in db");

	let contributor_id = String::from("0x0029");
	contributions::apply(&contribution.id, &contributor_id).await;
	let applications = applications::list_for_contributor(&contributor_id).await;
	assert!(
		applications.contains(&Application {
			contribution_id: contribution.id.clone(),
			contributor_id: contributor_id.clone()
		}),
		"{} {}",
		contribution.id,
		contributor_id
	);
	contributions::delete(lead_contributor, hex_str_to_u64(&contribution.id)).await;
	wait_for_events(events_count + 4).await;

	let contribution =
		contributions::get_project_contribution_by_issue_number(STARKONQUEST_TITLE, issue_number)
			.await
			.expect("Contribution not found in project");
	assert_eq!(&contribution.status, "ABANDONED");
	let applications = applications::list_for_contributor(&contributor_id).await;
	assert!(!applications.contains(&Application {
		contribution_id: contribution.id,
		contributor_id
	}));
}
