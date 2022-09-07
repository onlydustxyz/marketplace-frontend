mod projections;
pub use projections::MemberProjection;

mod aggregate;
pub use aggregate::{Event, Project as Aggregate};

mod projectors;
pub use projectors::MemberProjector;
