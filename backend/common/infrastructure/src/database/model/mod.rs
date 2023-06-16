mod repository;

use diesel::{Connection, Identifiable};
pub use repository::{ImmutableRepository, Repository};

use super::Result;

pub trait ImmutableModel<C>
where
	C: Connection,
	Self: Identifiable + Sized,
{
	fn exists(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<bool>;
	fn find_by_id(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<Self>;
	fn list(conn: &mut C) -> Result<Vec<Self>>;
	fn insert(self, conn: &mut C) -> Result<Self>;
	fn try_insert(self, conn: &mut C) -> Result<Option<Self>>;
	fn delete(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<Self>;
	fn clear(conn: &mut C) -> Result<()>;
}

pub trait Model<C>: ImmutableModel<C>
where
	C: Connection,
	Self: Identifiable + Sized,
{
	fn update(self, conn: &mut C) -> Result<Self>;
	fn upsert(self, conn: &mut C) -> Result<Self>;
}
