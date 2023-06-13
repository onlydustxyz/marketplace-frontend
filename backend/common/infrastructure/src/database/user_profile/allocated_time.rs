use diesel_derive_enum::DbEnum;
use serde::{Deserialize, Serialize};

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, DbEnum)]
#[ExistingTypePath = "crate::database::schema::sql_types::AllocatedTime"]
pub enum AllocatedTime {
	None,
	LessThanOneDay,
	OneToThreeDays,
	MoreThanThreeDays,
}

impl From<domain::AllocatedTime> for AllocatedTime {
	fn from(value: domain::AllocatedTime) -> Self {
		match value {
			domain::AllocatedTime::None => Self::None,
			domain::AllocatedTime::LessThanOneDay => Self::LessThanOneDay,
			domain::AllocatedTime::OneToThreeDays => Self::OneToThreeDays,
			domain::AllocatedTime::MoreThanThreeDays => Self::MoreThanThreeDays,
		}
	}
}
