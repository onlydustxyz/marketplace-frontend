use async_trait::async_trait;
use domain::{GithubSearchUserService, GithubServiceError, GithubServiceResult, GithubUser};
use olog::tracing::instrument;

use crate::github::{self, user::UserFromOctocrab};

#[async_trait]
impl GithubSearchUserService for github::Client {
	#[instrument(skip(self))]
	async fn users(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubUser>> {
		let users = self
			.search_users(query, sort, order, per_page, page)
			.await
			.map_err(Into::<GithubServiceError>::into)?
			.into_iter()
			.map(GithubUser::from_octocrab_user)
			.collect();
		Ok(users)
	}
}
