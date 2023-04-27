mod budget;
mod github;
mod project;

pub use budget::Projector as BudgetProjector;
pub use github::{
	crm::Projector as CrmProjector, issues::Projector as GithubIssuesRepositoryProjector,
};
pub use project::Projector as ProjectProjector;
