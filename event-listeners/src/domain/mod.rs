mod event_listener;
pub use event_listener::EventListener;

mod projections;
pub use projections::{
	ContributorProfile, ContributorProfileRepository, ContributorProfileRepositoryError,
	Error as ProjectionRepositoryError, Projection, Repository as ProjectionRepository,
};

mod projectors;
pub use projectors::ContributorWithGithubData as ContributorWithGithubDataProjector;

mod services;
pub use services::{GithubClient, GithubClientError, GithubUser, GithubUserId};

#[cfg(test)]
pub use services::MockGithubClient;

#[cfg(test)]
pub use projections::MockContributorProfileRepository;
