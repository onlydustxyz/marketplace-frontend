use diesel::{Identifiable, Insertable, Queryable};
use marketplace_infrastructure::database::schema::indexers;

#[derive(Insertable, Identifiable, Queryable, Debug)]
pub struct Indexer {
	pub id: String,
	pub index_head: i64,
}
