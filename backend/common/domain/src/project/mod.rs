mod aggregate;
pub use aggregate::{Error, Project};

mod events;
pub use events::Event;

mod visibility;
pub use visibility::Visibility;

crate::create_new_type!(Id, uuid::Uuid, uuid::Uuid::new_v4());
