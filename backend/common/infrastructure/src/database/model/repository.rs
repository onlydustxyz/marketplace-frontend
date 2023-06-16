use diesel::{Identifiable, PgConnection};

use super::{ImmutableModel, Model, Result};
use crate::database;

pub trait ImmutableRepository<M>: Send + Sync
where
	M: ImmutableModel<PgConnection>,
{
	fn exists(&self, id: <M as Identifiable>::Id) -> Result<bool>;
	fn find_by_id(&self, id: <M as Identifiable>::Id) -> Result<M>;
	fn list(&self) -> Result<Vec<M>>;
	fn insert(&self, model: M) -> Result<M>;
	fn try_insert(&self, model: M) -> Result<M>;
	fn delete(&self, id: <M as Identifiable>::Id) -> Result<M>;
	fn clear(&self) -> Result<()>;
}

impl<M> ImmutableRepository<M> for database::Client
where
	M: ImmutableModel<PgConnection>,
{
	fn exists(&self, id: <M as Identifiable>::Id) -> Result<bool> {
		let mut connection = self.connection()?;
		M::exists(&mut *connection, id)
	}

	fn find_by_id(&self, id: <M as Identifiable>::Id) -> Result<M> {
		let mut connection = self.connection()?;
		M::find_by_id(&mut *connection, id)
	}

	fn list(&self) -> Result<Vec<M>> {
		let mut connection = self.connection()?;
		M::list(&mut *connection)
	}

	fn insert(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.insert(&mut *connection)
	}

	fn try_insert(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.try_insert(&mut *connection)
	}

	fn delete(&self, id: <M as Identifiable>::Id) -> Result<M> {
		let mut connection = self.connection()?;
		M::delete(&mut *connection, id)
	}

	fn clear(&self) -> Result<()> {
		let mut connection = self.connection()?;
		M::clear(&mut *connection)
	}
}

pub trait Repository<M>: ImmutableRepository<M>
where
	M: Model<PgConnection>,
{
	fn update(&self, model: M) -> Result<M>;
	fn upsert(&self, model: M) -> Result<M>;
}

impl<M> Repository<M> for database::Client
where
	M: Model<PgConnection>,
{
	fn update(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.update(&mut *connection)
	}

	fn upsert(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.upsert(&mut *connection)
	}
}
