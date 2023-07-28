use diesel::query_builder::QueryId;
use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::ContactChannel"]
pub enum ContactChannel {
	Email,
	Telegram,
	Twitter,
	Discord,
	Linkedin,
	Whatsapp,
}

impl QueryId for crate::database::schema::sql_types::ContactChannel {
	type QueryId = ();

	const HAS_STATIC_QUERY_ID: bool = false;

	fn query_id() -> Option<std::any::TypeId> {
		None
	}
}
