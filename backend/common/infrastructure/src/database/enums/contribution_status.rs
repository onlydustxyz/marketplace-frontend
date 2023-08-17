use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Hash, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::ContributionStatus"]
pub enum ContributionStatus {
	InProgress,
	Complete,
	Canceled,
}
