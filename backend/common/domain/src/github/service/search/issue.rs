use async_trait::async_trait;

use super::Result;
use crate::GithubIssue;

#[async_trait]
pub trait Service: Send + Sync {
	async fn issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<GithubIssue>>;
}
