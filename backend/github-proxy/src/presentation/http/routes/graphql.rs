use crate::{domain::GithubService, presentation::graphql};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{response::content, State};
use std::sync::Arc;

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[derive(Default)]
pub struct GraphqlApiKey;
impl ApiKey for GraphqlApiKey {
	fn name() -> &'static str {
		"graphql"
	}
}

#[get("/graphql?<request>")]
pub async fn get(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}

#[post("/graphql", data = "<request>")]
pub async fn post(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}
