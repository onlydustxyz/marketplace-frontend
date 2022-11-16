mod projections;
pub use projections::{
	ContributorProfile, ContributorProfileRepository, ContributorProfileRepositoryError,
	Error as ProjectionRepositoryError, ProjectLead, ProjectLeadRepository,
	ProjectLeadRepositoryError, Projection, Repository as ProjectionRepository,
};

mod projectors;
pub use projectors::{
	ContributorWithGithubData as ContributorWithGithubDataProjector, ProjectLeadProjector,
};

mod services;
pub use services::{GithubClient, GithubClientError, GithubUser, GithubUserId};

#[cfg(test)]
pub use services::MockGithubClient;

#[cfg(test)]
pub use projections::{MockContributorProfileRepository, MockProjectLeadRepository};
