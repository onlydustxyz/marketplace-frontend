use crate::{domain::GithubService, presentation::graphql};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::ApiKey;
use rocket::{response::content, State};
use std::sync::Arc;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
pub async fn get(
	_api_key: ApiKey,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post(
	_api_key: ApiKey,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}
