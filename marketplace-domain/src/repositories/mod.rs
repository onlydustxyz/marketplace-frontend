mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

mod contribution_projection;
pub use contribution_projection::{
	Error as ContributionProjectionRepositoryError,
	MockRepository as MockContributionProjectionRepository,
	Repository as ContributionProjectionRepository,
};

mod contact_information;
pub use contact_information::{
	Error as ContactInformationRepositoryError, MockRepository as MockContactInformationRepository,
	Repository as ContactInformationRepository,
};

mod application_projection;
pub use application_projection::{
	Error as ApplicationProjectionRepositoryError,
	MockRepository as MockApplicationProjectionRepository,
	Repository as ApplicationProjectionRepository,
};

mod github_issue;
pub use github_issue::{Error as GithubIssueRepositoryError, Repository as GithubIssueRepository};

mod github_repo;
pub use github_repo::{Error as GithubRepoRepositoryError, Repository as GithubRepoRepository};

mod project_projection;
pub use project_projection::{
	Error as ProjectProjectionRepositoryError, Repository as ProjectProjectionRepository,
};

#[cfg(test)]
pub use github_issue::MockRepository as MockGithubIssueRepository;
#[cfg(test)]
pub use github_repo::MockRepository as MockGithubRepoRepository;
#[cfg(test)]
pub use project_projection::MockRepository as MockProjectProjectionRepository;
