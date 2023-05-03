mod budget;
mod github;
mod project;

pub use budget::Projector as BudgetProjector;
pub use github::{
	contributors::Projector as GithubNewContributorsProjector, crm::Projector as CrmProjector,
	issues::Projector as GithubIssuesRepositoryProjector, users::Projector as GithubUsersProjector,
};
pub use project::Projector as ProjectProjector;
