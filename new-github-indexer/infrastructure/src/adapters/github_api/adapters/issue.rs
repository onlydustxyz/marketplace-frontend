use chrono::{DateTime, Utc};
use domain::{models::issues::Issue, ports::output::github_api::*};

use crate::adapters::github_api::Client;

#[async_trait]
impl issue::Port for Client {
	#[allow(clippy::all)]
	async fn issue_by_repo_id(&self, _repo_id: u64, _issue_number: u64) -> Result<Issue> {
		todo!()
	}

	#[allow(clippy::all)]
	async fn issues_by_repo_id(
		&self,
		_repo_id: u64,
		_updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<Issue>> {
		todo!()
	}
}
