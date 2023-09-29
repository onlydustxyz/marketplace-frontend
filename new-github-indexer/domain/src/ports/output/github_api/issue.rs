use async_trait::async_trait;
use chrono::{DateTime, Utc};

use super::Result;
use crate::models::issues::Issue;

#[async_trait]
pub trait Port: Send + Sync {
	async fn issue_by_repo_id(&self, repo_id: u64, issue_number: u64) -> Result<Issue>;

	async fn issues_by_repo_id(
		&self,
		repo_id: u64,
		updated_since: Option<DateTime<Utc>>,
	) -> Result<Vec<Issue>>;
}
