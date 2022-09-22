mod aggregate;
pub use aggregate::{
	event::Event as ContributorEvent, Contributor as Aggregate, Error as ContributorError,
};
