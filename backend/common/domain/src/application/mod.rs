mod events;
pub use events::Event;

mod aggregate;
pub use aggregate::Application;

crate::create_new_id!(Id);
