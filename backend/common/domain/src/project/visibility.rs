use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, Serialize, Deserialize, PartialEq, Eq, GraphQLEnum)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Visibility {
	Private,
	#[default]
	Public,
}
