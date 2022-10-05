use super::*;
use chrono::Utc;
use dotenv::dotenv;
use itertools::Itertools;
use marketplace_infrastructure::database::{init_pool, Client as DatabaseClient};
use rstest::*;
use std::{ops::Deref, str::FromStr, sync::Arc};

trait Storable {
	fn into_storable(self) -> StorableEvent<Project>;
}

impl Storable for ProjectEvent {
	fn into_storable(self) -> StorableEvent<Project> {
		StorableEvent {
			event: self,
			deduplication_id: RandomUuidGenerator.new_uuid().to_string(),
			timestamp: Utc::now().naive_utc(),
			origin: EventOrigin::Starknet,
			metadata: Default::default(),
		}
	}
}

#[fixture]
fn database() -> Arc<DatabaseClient> {
	dotenv().ok();
	Arc::new(DatabaseClient::new(init_pool()))
}

#[fixture]
fn project_id() -> ProjectId {
	123456
}

#[fixture]
fn project_id_2() -> ProjectId {
	123456789
}

#[fixture]
fn contributor_account_address_1() -> ContributorAccountAddress {
	ContributorAccountAddress::from_str("0x666").unwrap()
}

#[fixture]
fn contributor_account_address_2() -> ContributorAccountAddress {
	ContributorAccountAddress::from_str("0x777").unwrap()
}

#[fixture]
fn contributor_account_address_3() -> ContributorAccountAddress {
	ContributorAccountAddress::from_str("0x888").unwrap()
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributor_account_address_1: ContributorAccountAddress,
	contributor_account_address_2: ContributorAccountAddress,
	contributor_account_address_3: ContributorAccountAddress,
	project_id: ProjectId,
	project_id_2: ProjectId,
) -> Arc<DatabaseClient> {
	<DatabaseClient as EventStore<Project>>::append(
		database.deref(),
		&project_id,
		vec![
			ProjectEvent::MemberAdded {
				project_id,
				contributor_account: contributor_account_address_1.clone(),
			},
			ProjectEvent::MemberAdded {
				project_id,
				contributor_account: contributor_account_address_2,
			},
			ProjectEvent::MemberRemoved {
				project_id,
				contributor_account: contributor_account_address_1.clone(),
			},
			ProjectEvent::LeadContributorAdded {
				project_id,
				contributor_account: contributor_account_address_1,
			},
			ProjectEvent::MemberAdded {
				project_id: project_id_2,
				contributor_account: contributor_account_address_3,
			},
		]
		.into_iter()
		.map(Storable::into_storable)
		.collect(),
	)
	.expect("Unable to add events in event store");

	database
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_project_members_from_events(
	filled_database: Arc<DatabaseClient>,
	project_id: ProjectId,
	contributor_account_address_2: ContributorAccountAddress,
) {
	let refresh_project_members_usecase = RefreshProjectsMembers::new(
		filled_database.clone(),
		Arc::new(ProjectMemberProjector::new(filled_database.clone())),
		filled_database.clone(),
	);

	let result = refresh_project_members_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let members = marketplace_domain::ProjectMemberProjectionRepository::list_by_project(
		filled_database.as_ref(),
		&project_id,
	)
	.unwrap();

	assert_eq!(members.len(), 1);
	assert!(
		members
			.iter()
			.map(|m| m.contributor_account_address())
			.contains(&contributor_account_address_2)
	);
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_lead_contributors_from_events(
	filled_database: Arc<DatabaseClient>,
	project_id: ProjectId,
	contributor_account_address_1: ContributorAccountAddress,
) {
	let refresh_lead_contributors_usecase = RefreshLeadContributors::new(
		filled_database.clone(),
		Arc::new(LeadContributorProjector::new(filled_database.clone())),
		filled_database.clone(),
	);

	let result = refresh_lead_contributors_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let lead_contributors =
		marketplace_domain::LeadContributorProjectionRepository::list_by_project(
			filled_database.as_ref(),
			&project_id,
		)
		.unwrap();

	assert_eq!(lead_contributors.len(), 1);
	assert!(
		lead_contributors
			.iter()
			.map(|m| m.account())
			.contains(&contributor_account_address_1)
	);
}
