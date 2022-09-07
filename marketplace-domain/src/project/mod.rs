mod projections;
pub use projections::MemberProjection;

mod aggregate;
pub use aggregate::{Event as ProjectEvent, Project as ProjectAggregate};
