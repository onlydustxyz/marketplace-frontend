mod contributions;
mod github_issues;
pub mod github_pull_request_indexes;
pub mod github_pull_requests;
mod github_repo_indexes;
mod github_repos;
mod github_user_indexes;
mod github_users;
mod project_github_repos;
mod projects_contributors;
mod projects_pending_contributors;
mod technologies;

pub use contributions::{Contribution, Repository as ContributionsRepository};
use diesel::PgConnection;
pub use github_issues::GithubIssue;
pub use github_pull_request_indexes::{
	GithubPullRequestIndex, Repository as GithubPullRequestIndexRepository,
};
pub use github_pull_requests::{
	PullRequest as GithubPullRequest, Repository as GithubPullRequestRepository,
};
pub use github_repo_indexes::{GithubRepoIndex, Repository as GithubRepoIndexRepository};
pub use github_repos::GithubRepo;
pub use github_user_indexes::{GithubUserIndex, Repository as GithubUserIndexRepository};
pub use github_users::GithubUser;
use infrastructure::database::{self, ImmutableModel, ImmutableRepository};
pub use project_github_repos::{ProjectGithubRepo, Repository as ProjectGithubRepoRepository};
pub use projects_contributors::{ProjectsContributor, Repository as ProjectsContributorRepository};
pub use projects_pending_contributors::{
	ProjectsPendingContributor, Repository as ProjectsPendingContributorRepository,
};
pub use technologies::Technology;

pub trait IdentifiableRepository<M, Id>: Send + Sync {
	fn exists(&self, id: Id) -> database::Result<bool>;
}

impl<R, M> IdentifiableRepository<M, M::Id> for R
where
	R: ImmutableRepository<M>,
	M: ImmutableModel<PgConnection>,
{
	fn exists(&self, id: M::Id) -> database::Result<bool> {
		<Self as ImmutableRepository<M>>::exists(self, id)
	}
}
