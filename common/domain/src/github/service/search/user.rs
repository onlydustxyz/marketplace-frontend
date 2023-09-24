use async_trait::async_trait;

use super::Result;
use crate::GithubUser;

#[async_trait]
pub trait Service: Send + Sync {
	async fn users(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> Result<Vec<GithubUser>>;
}
