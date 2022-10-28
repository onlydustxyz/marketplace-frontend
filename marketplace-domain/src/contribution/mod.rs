mod aggregate;
pub use aggregate::{Contribution, Error as ContributionError, Id as AggregateId};

mod events;
pub use events::Event;

mod status;
pub use status::Status;

mod projectors;
pub use projectors::{ApplicationProjector, GithubContributionProjector, GithubProjectProjector};

mod projections;
pub use projections::{
	ApplicationId, ApplicationProjection, ApplicationStatus, GithubContribution,
	GithubContributionMetadata, ProjectProjection,
};
