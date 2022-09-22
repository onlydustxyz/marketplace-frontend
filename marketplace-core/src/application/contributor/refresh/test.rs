use super::*;
use async_trait::async_trait;
use chrono::Utc;
use dotenv::dotenv;
use marketplace_infrastructure::database::Client as DatabaseClient;
use marketplace_tests::init_pool;
use mockall::mock;
use rstest::*;
use std::{ops::Deref, str::FromStr, sync::Arc};

mock! {
	pub GithubClient {}

	#[async_trait]
	impl GithubClient for GithubClient {
		async fn find_issue_by_id(
			&self,
			project_id: GithubProjectId,
			issue_number: GithubIssueNumber,
		) -> Result<GithubIssue, GithubClientError>;

		async fn find_repository_by_id(
			&self,
			project_id: GithubProjectId,
		) -> Result<GithubRepo, GithubClientError>;

		async fn find_user_by_id(&self, user_id: GithubUserId) -> Result<GithubUser, GithubClientError>;

		async fn authenticate_user(&self, authorization_code: String) -> Result<GithubUserId, GithubClientError>;
	}
}

trait Storable {
	fn into_storable(self) -> StorableEvent<ContributorAggregate>;
}

impl Storable for ContributorEvent {
	fn into_storable(self) -> StorableEvent<ContributorAggregate> {
		StorableEvent {
			event: self,
			deduplication_id: RandomUuidGenerator.new_uuid().to_string(),
			timestamp: Utc::now().naive_utc(),
		}
	}
}

#[fixture]
fn database() -> Arc<DatabaseClient> {
	dotenv().ok();
	Arc::new(DatabaseClient::new(init_pool()))
}

#[fixture]
fn github_client() -> MockGithubClient {
	MockGithubClient::new()
}

#[fixture]
fn contributor_account() -> ContributorAccount {
	ContributorAccount::from_str("0x17267621").unwrap()
}

#[fixture]
fn filled_database(
	database: Arc<DatabaseClient>,
	contributor_account: ContributorAccount,
) -> Arc<DatabaseClient> {
	// events for contributor #1
	{
		let storable_events = vec![ContributorEvent::GithubAccountAssociated {
			contributor_account: contributor_account.clone(),
			github_identifier: 100u64,
		}]
		.into_iter()
		.map(Storable::into_storable)
		.collect();

		<DatabaseClient as EventStore<ContributorAggregate>>::append(
			database.deref(),
			&contributor_account,
			storable_events,
		)
		.expect("Unable to add events in event store");
	}

	database
}

#[rstest]
#[cfg_attr(not(feature = "with_component_tests"), ignore = "component test")]
async fn refresh_contributors_from_events(
	filled_database: Arc<DatabaseClient>,
	mut github_client: MockGithubClient,
	contributor_account: ContributorAccount,
) {
	let refresh_contributors_usecase: RefreshContributors = {
		github_client.expect_find_user_by_id().returning(|_| Ok(Default::default()));

		Refresh::new(
			filled_database.clone(),
			Arc::new(ContributorProjector::new(
				Arc::new(github_client),
				filled_database.clone(),
			)),
			filled_database.clone(),
		)
	};

	let result = refresh_contributors_usecase.refresh_projection_from_events().await;
	assert!(result.is_ok(), "{}", result.err().unwrap());

	let contributor_id = ContributorId::from(HexPrefixedString::from(contributor_account.clone()));

	let result =
		ContributorProjectionRepository::find_by_id(&*filled_database.clone(), &contributor_id);
	assert!(result.is_ok(), "{}", result.err().unwrap());

	assert_eq!(
		ContributorProjection {
			id: contributor_id,
			github_identifier: 100u64,
			account: contributor_account,
			..Default::default()
		},
		result.unwrap()
	);
}
