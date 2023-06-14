use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::ContactChannel"]
pub enum Channel {
	Email,
	Telegram,
	Twitter,
	Discord,
	Linkedin,
}
