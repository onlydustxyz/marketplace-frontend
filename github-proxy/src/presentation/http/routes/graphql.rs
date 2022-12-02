use crate::presentation::graphql;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use rocket::response::content;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub async fn get(request: GraphQLRequest) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new();
	request.execute(&schema, &context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post(request: GraphQLRequest) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new();
	request.execute(&schema, &context).await
}
