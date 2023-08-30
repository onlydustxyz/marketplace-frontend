use async_trait::async_trait;
use domain::{
	GithubFetchUserService, GithubFullUser, GithubServiceResult, GithubUser, GithubUserId,
};
use olog::tracing::instrument;

use crate::github::{self, user::UserFromOctocrab};

#[async_trait]
impl GithubFetchUserService for github::Client {
	#[instrument(skip(self))]
	async fn current_user(&self) -> GithubServiceResult<GithubUser> {
		let user = self.get_current_user().await?;
		Ok(GithubUser::from_octocrab_user(user))
	}

	#[instrument(skip(self))]
	async fn full_user_by_id(&self, id: &GithubUserId) -> GithubServiceResult<GithubFullUser> {
		let user = self.get_full_user_by_id(id).await?;
		Ok(user)
	}
}
