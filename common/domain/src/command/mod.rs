mod entity;
pub use entity::{AggregateId, Entity};

pub mod repository;

crate::create_new_id!(Id);
