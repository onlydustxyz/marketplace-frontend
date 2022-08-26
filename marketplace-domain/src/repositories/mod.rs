mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

mod contribution;
pub use contribution::{
	Error as ContributionRepositoryError, MockRepository as MockContributionRepository,
	Repository as ContributionRepository,
};

mod contact_information;
pub use contact_information::{
	Error as ContactInformationRepositoryError, MockRepository as MockContactInformationRepository,
	Repository as ContactInformationRepository,
};

mod application;
pub use application::{
	Error as ApplicationRepositoryError, MockRepository as MockApplicationRepository,
	Repository as ApplicationRepository,
};

mod github_issue;
pub use github_issue::{Error as GithubIssueRepositoryError, Repository as GithubIssueRepository};

#[cfg(test)]
pub use github_issue::MockRepository as MockGithubIssueRepository;
