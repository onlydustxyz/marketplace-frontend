use domain::Entity;

use crate::database::DatabaseError;

pub trait Repository<E1: Entity, E2: Entity>: Send + Sync {
	fn insert(&self, id1: &E1::Id, id2: &E2::Id) -> Result<(), DatabaseError>;
}
