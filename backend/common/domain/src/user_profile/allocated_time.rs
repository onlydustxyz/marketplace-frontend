use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, GraphQLEnum)]
pub enum AllocatedTime {
	None,
	LessThanOneDay,
	OneToThreeDays,
	MoreThanThreeDays,
}
