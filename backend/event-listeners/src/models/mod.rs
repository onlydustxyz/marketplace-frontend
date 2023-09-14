mod applications;
mod budgets;
mod contributions;
mod crypto_usd_quotes;
mod github_issues;
pub mod github_pull_request_indexes;
pub mod github_pull_requests;
mod github_repo_indexes;
mod github_repos;
mod github_user_indexes;
mod github_users;
mod payment_requests;
mod payments;
mod project_github_repos;
mod project_leads;
mod projects;
mod projects_budgets;
mod projects_contributors;
mod projects_pending_contributors;
mod projects_rewarded_users;
mod technologies;
mod work_items;

pub use applications::Application;
pub use budgets::Budget;
pub use contributions::{Contribution, Repository as ContributionsRepository};
use diesel::PgConnection;
pub use crypto_usd_quotes::CryptoUsdQuote;
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
pub use payment_requests::PaymentRequest;
pub use payments::Payment;
pub use project_github_repos::{ProjectGithubRepo, Repository as ProjectGithubRepoRepository};
pub use project_leads::ProjectLead;
pub use projects::Project;
pub use projects_budgets::ProjectsBudget;
pub use projects_contributors::{ProjectsContributor, Repository as ProjectsContributorRepository};
pub use projects_pending_contributors::{
	ProjectsPendingContributor, Repository as ProjectsPendingContributorRepository,
};
pub use projects_rewarded_users::{
	ProjectsRewardedUser, Repository as ProjectsRewardedUserRepository,
};
pub use technologies::Technology;
pub use work_items::{Repository as WorkItemRepository, WorkItem};

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
