mod projections;
pub use projections::MemberProjection;

mod aggregate;
pub use aggregate::{event::Event as ProjectEvent, Project as Aggregate};

mod projectors;
pub use projectors::MemberProjector;
