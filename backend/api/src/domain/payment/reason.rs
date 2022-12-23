use juniper::GraphQLInputObject;
use serde::Serialize;

#[derive(Serialize, GraphQLInputObject)]
pub struct Reason {
	work_items: Option<Vec<String>>,
}
