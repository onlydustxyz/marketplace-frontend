use diesel::{Identifiable, PgConnection};

use super::{Model, Result};
use crate::database;

pub trait Repository<M>: Send + Sync
where
	M: Model<PgConnection>,
{
	fn exists(&self, id: <M as Identifiable>::Id) -> Result<bool>;
	fn find_by_id(&self, id: <M as Identifiable>::Id) -> Result<M>;
	fn list(&self) -> Result<Vec<M>>;
	fn insert(&self, model: M) -> Result<M>;
	fn try_insert(&self, model: M) -> Result<M>;
	fn update(&self, model: M) -> Result<M>;
	fn upsert(&self, model: M) -> Result<M>;
	fn delete(&self, id: <M as Identifiable>::Id) -> Result<M>;
	fn clear(&self) -> Result<()>;
}

impl<M> Repository<M> for database::Client
where
	M: Model<PgConnection>,
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

	fn update(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.update(&mut *connection)
	}

	fn upsert(&self, model: M) -> Result<M> {
		let mut connection = self.connection()?;
		model.upsert(&mut *connection)
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
