mod entity;
pub use entity::{AggregateId, Entity};

pub mod repository;

crate::create_new_type!(Id, uuid::Uuid, uuid::Uuid::new_v4());
