//! HTTP handlers for GraphQL API
//!
//! This module provides HTTP handlers to interact with the GraphQL API.
//!
//! # Examples
//!
//! Getting the GraphiQL interface:
//!
//! ```rust
//! use rocket::http::ContentType;
//! use rocket::local::asynchronous::Client;
//! use rocket::tokio::time::Duration;
//!
//! #[rocket::launch]
//! fn rocket() -> _ {
//!     let schema = juniper::EmptyMutation::<()>::new_root_schema(juniper::EmptySubscription::<()>::new());
//!     let state = crate::presentation::graphql::State::new(schema);
//!
//!     let rocket = rocket::build()
//!         .mount("/", routes![graphiql])
//!         .manage(state);
//!
//!     rocket
//! }
//!
//! #[tokio::test]
//! async fn test() {
//!     let client = Client::tracked(rocket()).await.expect("client");
//!
//!     let response = client.get("/")
//!         .header(ContentType::HTML)
//!         .dispatch()
//!         .await;
//!
//!     let result = response.into_string().await.expect("string");
//!
//!     assert!(result.contains("GraphiQL"));
//! }
//! ```
//!
//! Sending a GraphQL request:
//!
//! ```rust
//! use serde_json::json;
//!
//! #[rocket::launch]
//! fn rocket() -> _ {
//!     let schema = juniper::EmptyMutation::<()>::new_root_schema(juniper::EmptySubscription::<()>::new());
//!     let state = crate::presentation::graphql::State::new(schema);
//!
//!     let rocket = rocket::build()
//!         .mount("/graphql", routes![get_graphql_handler, post_graphql_handler])
//!         .manage(state);
//!
//!     rocket
//! }
//!
//! #[tokio::test]
//! async fn test() {
//!     let query = r#"
//!         query {
//!             __typename
//!         }
//!     "#;
//!
//!     let client = reqwest::Client::new();
//!
//!     let response = client.post("http://localhost:80/graphql")
//!         .json(&json!({ "query": query }))
//!         .send()
//!         .await
//!         .expect("response");
//!
//!     let body = response.json::<serde_json::Value>().await.expect("json");
//!
//!     assert_eq!(body, json!({"data":{"__typename":"Query"}}));
//! }
//! ```

use std::sync::Arc;

use domain::{AggregateRootRepository, Event, Project, Publisher};
use infrastructure::{
    amqp::{self, UniqueMessage},
    github, graphql,
};
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
use presentation::http::guards::{ApiKey, ApiKeyGuard, OptionUserId, Role};
use rocket::{response::content, State};
use tracing::{debug, instrument};

use crate::{
    domain::permissions::IntoPermission,
    infrastructure::{
        database::{
            IgnoredGithubIssuesRepository, PendingProjectLeaderInvitationsRepository,
            ProjectDetailsRepository, ProjectSponsorRepository, SponsorRepository,
            UserInfoRepository,
        },
        simple_storage,
        web3::ens,
    },
    presentation::graphql::{Context, Schema},
};

/// Trait for GraphQL API key.
pub struct GraphqlApiKey;

impl ApiKey for GraphqlApiKey {
    fn name() -> &'static str {
        "graphql"
    }
}

/// Returns the GraphiQL interface.
#[get("/")]
pub fn graphiql() -> content::RawHtml<String> {
    juniper_rocket::graphiql_source("/graphql", None)
}

/// Handles GET requests to GraphQL API.
#[allow(clippy::too_many_arguments)]
#[get("/graphql?<request>")]
#[instrument(skip_all, fields(user.ids = debug(&maybe_user_id), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn get_graphql_handler(
    _api_key: ApiKeyGuard<GraphqlApiKey>,
    role: Role,
    maybe_user_id: OptionUserId,
    request: GraphQLRequest,
    schema: &State<Schema>,
    event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
    project_repository: &State<AggregateRootRepository<Project>>,
    project_details_repository: &State<ProjectDetailsRepository>,
    sponsor_repository: &State<SponsorRepository>,
    project_sponsor_repository: &State<ProjectSponsorRepository>,
    pending_project_leader_invitations_repository: &State<
        PendingProjectLeaderInvitationsRepository,
    >,
    ignored_github_issues_repository: &State<IgnoredGithubIssuesRepository>,
    user_info_repository: &State<UserInfoRepository>,
    graphql: &State<Arc<graphql::Client>>,
    github: &State<Arc<github::Client>>,
    amqp: &State<Arc<amqp::Bus>>,
    ens: &State<Arc<ens::Client>>,
    simple_storage: &State<Arc<simple_storage::Client>>,
) -> GraphQLResponse {
    let context = Context::new(
        role.to_permissions((*project_repository).clone()),
        maybe_user_id,
        (*event_publisher).clone(),
        (*project_repository).clone(),
        (*project_details_repository).clone(),
        (*sponsor_repository).clone(),
        (*project_sponsor_repository).clone(),
        (*pending_project_leader_invitations_repository).clone(),
        (*ignored_github_issues_repository).clone(),
        (*user_info_repository).clone(),
        (*graphql).clone(),
        (*github).clone(),
        (*ens).clone(),
        (*simple_storage).clone(),
        (*amqp).clone(),
    );
    request.execute(schema, &context).await
}

/// Handles POST requests to GraphQL API.
#[allow(clippy::too_many_arguments)]
#[post("/graphql", data = "<request>")]
#[instrument(skip_all, fields(user.ids = debug(&maybe_user_id), user.role = debug(&role), graphql_request = debug(&request)))]
pub async fn post_graphql_handler(
    _api_key: ApiKeyGuard<GraphqlApiKey>,
    role: Role,
    maybe_user_id: OptionUserId,
    request: GraphQLRequest,
    schema: &State<Schema>,
    event_publisher: &State<Arc<dyn Publisher<UniqueMessage<Event>>>>,
    project_repository: &State<AggregateRootRepository<Project>>,
    project_details_repository: &State<ProjectDetailsRepository>,
    sponsor_repository: &State<SponsorRepository>,
    project_sponsor_repository: &State<ProjectSponsorRepository>,
    pending_project_leader_invitations_repository: &State<
        PendingProjectLeaderInvitationsRepository,
    >,
    ignored_github_issues_repository: &State<IgnoredGithubIssuesRepository>,
    user_info_repository: &State<UserInfoRepository>,
    graphql: &State<Arc<graphql::Client>>,
    github: &State<Arc<github::Client>>,
    amqp: &State<Arc<amqp::Bus>>,
    ens: &State<Arc<ens::Client>>,
    simple_storage: &State<Arc<simple_storage::Client>>,
) -> GraphQLResponse {
    let context = Context::new(
        role.to_permissions((*project_repository).clone()),
        maybe_user_id,
        (*event_publisher).clone(),
        (*project_repository).clone(),
        (*project_details_repository).clone(),
        (*sponsor_repository).clone(),
        (*project_sponsor_repository).clone(),
        (*pending_project_leader_invitations_repository).clone(),
        (*ignored_github_issues_repository).clone(),
        (*user_info_repository).clone(),
        (*graphql).clone(),
        (*github).clone(),
        (*ens).clone(),
        (*simple_storage).clone(),
        (*amqp).clone(),
    );
    request.execute(schema, &context).await
}