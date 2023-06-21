mod events;
pub use events::Event;

mod aggregate;
pub use aggregate::{Budget, Error};

crate::create_new_id!(Id);
