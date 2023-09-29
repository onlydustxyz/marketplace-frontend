use std::sync::Arc;

use domain::{GithubFetchService, GithubFullUser, GithubUserId};
use infrastructure::dbclient::Repository;

use self::{crawler::UserCrawler, projector::UserProjector};
use super::{Crawler, IndexerImpl, Projector};
use crate::models::{GithubUser, GithubUserIndexRepository};

mod crawler;
mod projector;

pub fn new(
	github_fetch_service: Arc<dyn GithubFetchService>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
	github_users_repository: Arc<dyn Repository<GithubUser>>,
) -> IndexerImpl<GithubUserId, Option<GithubFullUser>> {
	IndexerImpl {
		crawler: Arc::new(UserCrawler::new(
			github_fetch_service,
			github_user_index_repository,
		)),
		projector: Arc::new(UserProjector::new(github_users_repository)),
	}
}
