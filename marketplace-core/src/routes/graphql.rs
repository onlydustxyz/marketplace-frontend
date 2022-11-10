use juniper::{EmptyMutation, EmptySubscription, RootNode};
use rocket::{response::content, State};

use crate::graphql::Query;

pub type Schema = RootNode<'static, Query, EmptyMutation<()>, EmptySubscription<()>>;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub fn get_graphql_handler(
	request: juniper_rocket::GraphQLRequest,
	schema: &State<Schema>,
) -> juniper_rocket::GraphQLResponse {
	request.execute_sync(&**schema, &())
}

#[post("/graphql", data = "<request>")]
pub fn post_graphql_handler(
	request: juniper_rocket::GraphQLRequest,
	schema: &State<Schema>,
) -> juniper_rocket::GraphQLResponse {
	request.execute_sync(&**schema, &())
}
