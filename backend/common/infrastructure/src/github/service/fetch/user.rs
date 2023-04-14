use async_trait::async_trait;
use domain::{GithubFetchUserService, GithubServiceResult, GithubUser, GithubUserId};
use olog::tracing::instrument;

use crate::github::{self, user::UserFromOctocrab};

#[async_trait]
impl GithubFetchUserService for github::Client {
	#[instrument(skip(self))]
	async fn user(&self, username: &str) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_name(username).await?;
		Ok(GithubUser::from_octocrab_user(user))
	}

	#[instrument(skip(self))]
	async fn user_by_id(&self, id: &GithubUserId) -> GithubServiceResult<GithubUser> {
		let user = self.get_user_by_id(id).await?;
		Ok(GithubUser::from_octocrab_user(user))
	}

	#[instrument(skip(self))]
	async fn current_user(&self) -> GithubServiceResult<GithubUser> {
		let user = self.get_current_user().await?;
		Ok(GithubUser::from_octocrab_user(user))
	}
}
