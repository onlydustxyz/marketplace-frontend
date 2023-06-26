use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, GraphQLEnum)]
pub enum AllocatedTime {
	None,
	LessThanOneDay,
	OneToThreeDays,
	MoreThanThreeDays,
}

impl From<AllocatedTime> for infrastructure::database::enums::AllocatedTime {
	fn from(value: AllocatedTime) -> Self {
		match value {
			AllocatedTime::None => Self::None,
			AllocatedTime::LessThanOneDay => Self::Lt1day,
			AllocatedTime::OneToThreeDays => Self::_1to3days,
			AllocatedTime::MoreThanThreeDays => Self::Gt3days,
		}
	}
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, GraphQLEnum)]
pub enum ProfileCover {
	Cyan,
	Magenta,
	Yellow,
	Blue,
}

impl From<ProfileCover> for infrastructure::database::enums::ProfileCover {
	fn from(value: ProfileCover) -> Self {
		match value {
			ProfileCover::Cyan => Self::Cyan,
			ProfileCover::Magenta => Self::Magenta,
			ProfileCover::Yellow => Self::Yellow,
			ProfileCover::Blue => Self::Blue,
		}
	}
}
