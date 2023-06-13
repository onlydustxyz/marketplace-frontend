use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, GraphQLEnum)]
pub enum AllocatedTime {
	None,
	LessThanOneDay,
	OneToThreeDays,
	MoreThanThreeDays,
}

impl From<AllocatedTime> for infrastructure::database::user_profile::AllocatedTime {
	fn from(value: AllocatedTime) -> Self {
		match value {
			AllocatedTime::None => Self::None,
			AllocatedTime::LessThanOneDay => Self::LessThanOneDay,
			AllocatedTime::OneToThreeDays => Self::OneToThreeDays,
			AllocatedTime::MoreThanThreeDays => Self::MoreThanThreeDays,
		}
	}
}
