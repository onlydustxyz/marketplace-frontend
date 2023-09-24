mod repository;

use diesel::{
	query_builder::{DeleteStatement, IntoUpdateTarget, QueryFragment, QueryId},
	query_dsl::methods::FilterDsl,
	sql_types::BoolOrNullableBool,
	AppearsOnTable, Connection, Identifiable,
};
pub use repository::{ImmutableRepository, Repository};

use super::Result;

pub trait ImmutableModel<C>
where
	C: Connection,
	Self: Identifiable + IntoUpdateTarget + Sized,
{
	fn exists(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<bool>;
	fn find_by_id(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<Self>;
	fn list(conn: &mut C) -> Result<Vec<Self>>;
	fn insert(self, conn: &mut C) -> Result<Self>;
	fn insert_all(conn: &mut C, values: Vec<Self>) -> Result<usize>;
	fn try_insert(self, conn: &mut C) -> Result<Option<Self>>;
	fn delete(conn: &mut C, id: <Self as Identifiable>::Id) -> Result<Option<Self>>;
	fn delete_all<P>(conn: &mut C, predicate: P) -> Result<usize>
	where
		DeleteStatement<Self::Table, Self::WhereClause>: FilterDsl<P>,
		<P as diesel::Expression>::SqlType: BoolOrNullableBool,
		P: AppearsOnTable<Self::Table> + QueryFragment<C::Backend> + QueryId;
	fn clear(conn: &mut C) -> Result<()>;
}

pub trait Model<C>: ImmutableModel<C>
where
	C: Connection,
	Self: Identifiable + Sized,
{
	fn update(self, conn: &mut C) -> Result<Self>;
	fn update_all(conn: &mut C, values: Vec<Self>) -> Result<()> {
		values.into_iter().try_for_each(|value| value.update(conn).map(|_| ()))
	}
	fn upsert(self, conn: &mut C) -> Result<Self>;
}
