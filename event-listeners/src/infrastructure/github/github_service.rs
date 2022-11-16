use super::Client;
use crate::domain::*;
use anyhow::anyhow;
use async_trait::async_trait;

#[async_trait]
impl GithubClient for Client {
	async fn find_user_by_id(
		&self,
		user_id: GithubUserId,
	) -> Result<GithubUser, GithubClientError> {
		let user = self
			.user(&user_id.to_string())
			.await
			.map_err(|e| GithubClientError::Infrastructure(anyhow!(e)))?;

		Ok(GithubUser {
			id: *user.id,
			name: user.login,
		})
	}
}
