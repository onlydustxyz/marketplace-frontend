use super::*;
use dotenv::dotenv;
use marketplace_infrastructure::database::{init_pool, Client as DatabaseClient};
use rstest::*;
use std::{str::FromStr, sync::Arc};

trait Storable {
	fn into_storable(self) -> StorableEvent<ProjectAggregate>;
}

impl Storable for ProjectEvent {
	fn into_storable(self) -> StorableEvent<ProjectAggregate> {
		StorableEvent {
			event: self,
			deduplication_id: RandomUuidGenerator.new_uuid().to_string(),
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
fn contributor_account() -> ContributorAccount {
	ContributorAccount::from_str("0x666").unwrap()
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributor_account: ContributorAccount,
	project_id: ProjectId,
) -> Arc<DatabaseClient> {
	database
		.append(
			&project_id,
			vec![
				ProjectEvent::MemberAdded {
					project_id: project_id.clone(),
					contributor_account: contributor_account.clone(),
				},
				ProjectEvent::MemberRemoved {
					project_id: project_id.clone(),
					contributor_account: contributor_account.clone(),
				},
				ProjectEvent::LeadContributorAdded {
					project_id,
					contributor_account,
				},
			]
			.into_iter()
			.map(Storable::into_storable)
			.collect(),
		)
		.expect("Unable to add events in event store");

	database
}

#[fixture]
fn refresh_project_members_usecase(filled_database: Arc<DatabaseClient>) -> RefreshProjectsMembers {
	RefreshProjectsMembers::new(
		filled_database.clone(),
		Arc::new(ProjectMemberProjector::new(filled_database.clone())),
		filled_database,
	)
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributions_from_events(
	refresh_project_members_usecase: RefreshProjectsMembers,
) {
	let result = refresh_project_members_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
}
