//! This module provides handlers for GraphQL queries and GraphiQL interface.
//!
//! # Dependencies
//!
//! This module depends on [`rocket`], [`juniper_rocket`], [`tracing`], and other external crates.
//!
//! [`rocket`]: https://crates.io/crates/rocket
//! [`juniper_rocket`]: https://crates.io/crates/juniper_rocket
//! [`tracing`]: https://crates.io/crates/tracing
//!
//! # Examples
//!
//! ```no_run
//! use std::sync::Arc;
//! use presentation::http::guards::{ApiKey, ApiKeyGuard};
//! use rocket::{response::content, State};
//!
//! use crate::{Config, Schema};
//!
//! #[get("/")]
//! pub fn graphiql() -> content::RawHtml<String> {
//! 	juniper_rocket::graphiql_source("/graphql", None)
//! }
//!
//! #[derive(Default)]
//! pub struct GraphqlApiKey;
//! impl ApiKey for GraphqlApiKey {
//! 	fn name() -> &'static str {
//! 		"graphql"
//! 	}
//! }
//!
//! #[get("/graphql?<request>")]
//! #[instrument(skip_all, fields(graphql_request = debug(&request)))]
//! pub async fn get_graphql_handler(
//! 	_api_key: ApiKeyGuard<GraphqlApiKey>,
//! 	config: &State<Config>,
//! 	github: &State<Arc<dyn GithubService>>,
//! 	maybe_github_pat: OptionGithubPat,
//! 	request: GraphQLRequest,
//! 	schema: &State<Schema>,
//! ) -> GraphQLResponse {
//! 	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
//! 	request.execute(schema, &context).await
//! }
//!
//! #[post("/graphql", data = "<request>")]
//! #[instrument(skip_all, fields(graphql_request = debug(&request)))]
//! pub async fn post_graphql_handler(
//! 	_api_key: ApiKeyGuard<GraphqlApiKey>,
//! 	config: &State<Config>,
//! 	github: &State<Arc<dyn GithubService>>,
//! 	maybe_github_pat: OptionGithubPat,
//! 	request: GraphQLRequest,
//! 	schema: &State<Schema>,
//! ) -> GraphQLResponse {
//! 	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
//! 	request.execute(schema, &context).await
//! }
//! ```


use std::sync::Arc;

use domain::GithubService;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{response::content, State};
use tracing::instrument;

use crate::{Config, Schema};

#[get("/")]
/// Renders GraphiQL interface.
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
/// Handles GraphQL queries sent via GET method.
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	config: &State<Config>,
	github: &State<Arc<dyn GithubService>>,
	maybe_github_pat: OptionGithubPat,
	request: GraphQLRequest,
	schema: &State<Schema>,
) -> GraphQLResponse {
	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
	request.execute(schema, &context).await
}

#[post("/graphql", data = "<request>")]
/// Handles GraphQL queries sent via POST method.
#[instrument(skip_all, fields(graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
	_api_key: ApiKeyGuard<GraphqlApiKey>,
	config: &State<Config>,
	github: &State<Arc<dyn GithubService>>,
	maybe_github_pat: OptionGithubPat,
	request: GraphQLRequest,
	schema: &State<Schema>,
) -> GraphQLResponse {
	let context = graphql::Context::new(maybe_github_pat, (*config).clone(), (*github).clone());
	request.execute(schema, &context).await
}