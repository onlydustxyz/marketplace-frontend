use diesel::{Insertable, Queryable};
use marketplace_infrastructure::database::schema::event_filters;

#[derive(Insertable, Queryable, Debug)]
pub struct EventFilter {
	pub indexer_id: String,
	pub source_contract: String,
}
