use std::sync::Arc;

use domain::GithubService;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{
	presentation::{graphql, graphql::Schema, http::guards::OptionGithubPat},
	Config,
};

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
	maybe_github_pat: OptionGithubPat,
	config: &State<Config>,
	github: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
	schema: &State<Schema>,
) -> GraphQLResponse {
	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
	request.execute(schema, &context).await
}

#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	maybe_github_pat: OptionGithubPat,
	config: &State<Config>,
	github: &State<Arc<dyn GithubService>>,
	request: GraphQLRequest,
	schema: &State<Schema>,
) -> GraphQLResponse {
	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
	request.execute(schema, &context).await
}
