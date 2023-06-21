use std::sync::Arc;

use infrastructure::github;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{response::content, State};
use tracing::instrument;

use crate::presentation::graphql::{Context, Schema};

#[derive(Default)]
pub struct GraphqlApiKey;

impl ApiKey for GraphqlApiKey {
	fn name() -> &'static str {
		"graphql"
	}
}

#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
	juniper_rocket::graphiql_source("/graphql", None)
}

#[get("/graphql?<request>")]
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	request: GraphQLRequest,
	schema: &State<Schema>,
	github: &State<Arc<github::Client>>,
) -> GraphQLResponse {
	let context = Context::new((*github).clone());
	request.execute(schema, &context).await
}

#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	request: GraphQLRequest,
	schema: &State<Schema>,
	github: &State<Arc<github::Client>>,
) -> GraphQLResponse {
	let context = Context::new((*github).clone());
	request.execute(schema, &context).await
}
