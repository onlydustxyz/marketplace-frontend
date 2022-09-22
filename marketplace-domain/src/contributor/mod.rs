mod aggregate;
pub use aggregate::{
	event::Event as ContributorEvent, Contributor as Aggregate, Error as ContributorError,
};

mod projections;
pub use projections::Contributor as ContributorProjection;

mod projectors;
pub use projectors::ContributorProjector;
