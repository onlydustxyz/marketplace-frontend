mod applications;
mod contributions;
mod projects;

use std::{str::FromStr, sync::Arc};

use async_trait::async_trait;
use chrono::{NaiveDate, NaiveDateTime, Utc};
use dotenv::dotenv;
use mockall::mock;
use rstest::fixture;

use marketplace_domain::*;
use marketplace_infrastructure::database::Client as DatabaseClient;
use marketplace_tests::init_pool;

const PROJECT_ID: GithubProjectId = 1234567890;

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
	fn into_storable(self) -> StorableEvent<Contribution>;
}

impl Storable for ContributionEvent {
	fn into_storable(self) -> StorableEvent<Contribution> {
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
#[once]
fn now() -> NaiveDateTime {
	NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11)
}
