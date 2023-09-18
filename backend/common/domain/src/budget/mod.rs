mod aggregate;
mod events;
mod state;

pub use aggregate::{Budget, Error};
pub use events::Event;

crate::create_new_id!(Id);
