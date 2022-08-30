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

#[cfg(test)]
pub use github_issue::MockRepository as MockGithubIssueRepository;
