mod aggregate_root;
pub use aggregate_root::{
	Contribution, Event as ContributionEvent, Id as AggregateId, Status as ContributionStatus,
};

mod projectors;
pub use projectors::ContributionProjector;

mod projections;
pub use projections::{ContributionProjection, ContributionProjectionMetadata};

mod repositories;
pub use repositories::*;
