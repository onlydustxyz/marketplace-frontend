use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFullUser, GithubUserId};
use infrastructure::database::Repository;

use super::{super::error::Result, Projector};
use crate::models::GithubUser;

#[derive(new)]
pub struct UserProjector {
	github_users_repository: Arc<dyn Repository<GithubUser>>,
}

#[async_trait]
impl Projector<GithubUserId, Option<GithubFullUser>> for UserProjector {
	async fn perform_projections(
		&self,
		_user_id: &GithubUserId,
		data: Option<GithubFullUser>,
	) -> Result<()> {
		if let Some(user) = data {
			self.github_users_repository.upsert(user.into())?;
		}
		Ok(())
	}
}
