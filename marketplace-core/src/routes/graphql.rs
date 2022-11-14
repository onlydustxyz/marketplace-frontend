use crate::graphql::{Context, Schema};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub async fn get_graphql_handler(
	request: GraphQLRequest,
	schema: &State<Schema>,
	context: &State<Context>,
) -> GraphQLResponse {
	request.execute(schema, context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post_graphql_handler(
	request: GraphQLRequest,
	schema: &State<Schema>,
	context: &State<Context>,
) -> GraphQLResponse {
	request.execute(schema, context).await
}
