pub trait Entity {
	type Id;
}

use anyhow::Result;
pub trait Repository<E: Entity>: Send + Sync {
	fn insert(&self, entity: &E) -> Result<()>;
	fn update(&self, id: &E::Id, entity: &E) -> Result<()>;
	fn upsert(&self, entity: &E) -> Result<()>;
	fn delete(&self, id: &E::Id) -> Result<()>;
	fn clear(&self) -> Result<()>;
}
