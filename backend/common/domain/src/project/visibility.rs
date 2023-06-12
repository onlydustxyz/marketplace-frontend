use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, Serialize, Deserialize, PartialEq, Eq, GraphQLEnum)]
pub enum Visibility {
	Private,
	#[default]
	Public,
}
