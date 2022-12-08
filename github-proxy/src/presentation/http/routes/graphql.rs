use std::sync::Arc;

use crate::{domain::GithubService, presentation::graphql};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub async fn get(
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post(
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}
