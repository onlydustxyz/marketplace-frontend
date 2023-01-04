use std::sync::Arc;

use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{domain::GithubService, presentation::graphql};

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
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}

#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	github_service: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
) -> GraphQLResponse {
	let schema = graphql::create_schema();
	let context = graphql::Context::new((*github_service).clone());
	request.execute(&schema, &context).await
}
