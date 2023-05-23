use std::sync::Arc;

use ::domain::{AggregateRootRepository, Event, Project, Publisher};
use anyhow::Result;
use http::Config;
use infrastructure::{
    amqp::{self, UniqueMessage},
    github,
    web3::ens,
};
use presentation::http;

use crate::{
    infrastructure::{
        database::{
            IgnoredGithubIssuesRepository, PendingProjectLeaderInvitationsRepository,
            ProjectDetailsRepository, ProjectSponsorRepository, SponsorRepository,
            UserInfoRepository,
        },
        simple_storage,
    },
    presentation::graphql,
};

pub mod dto;
pub mod roles;
mod routes;

/// Starts the server and runs indefinitely until it is terminated.
///
/// # Arguments
///
/// * `config` - The configuration for the server's HTTP listener.
/// * `schema` - The schema for the server's GraphQL API.
/// * `event_publisher` - The publisher used for sending domain events.
/// * `project_repository` - The repository holding `Project` aggregates.
/// * `project_details_repository` - The repository holding additional details about projects.
/// * `sponsor_repository` - The repository holding sponsors.
/// * `project_sponsor_repository` - The repository holding associations between projects and sponsors.
/// * `pending_project_leader_invitations_repository` - The repository holding pending project leader invitations.
/// * `ignored_github_issues_repository` - The repository holding ignored GitHub Issues.
/// * `user_info_repository` - The repository holding user information.
/// * `graphql` - The client for the server's GraphQL API.
/// * `github` - The client for interacting with the GitHub API.
/// * `ens` - The client for interacting with the Ethereum Name Service API.
/// * `simple_storage` - The client for interacting with IPFS using the SimpleStorage contract.
/// * `publisher` - The bus for publishing messages to RabbitMQ.
///
/// # Errors
///
/// If the server fails to start, an error will be returned.
#[allow(clippy::too_many_arguments)]
pub async fn serve(
    config: Config,
    schema: graphql::Schema,
    event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
    project_repository: AggregateRootRepository<Project>,
    project_details_repository: ProjectDetailsRepository,
    sponsor_repository: SponsorRepository,
    project_sponsor_repository: ProjectSponsorRepository,
    pending_project_leader_invitations_repository: PendingProjectLeaderInvitationsRepository,
    ignored_github_issues_repository: IgnoredGithubIssuesRepository,
    user_info_repository: UserInfoRepository,
    graphql: Arc<infrastructure::graphql::Client>,
    github: Arc<github::Client>,
    ens: Arc<ens::Client>,
    simple_storage: Arc<simple_storage::Client>,
    publisher: Arc<amqp::Bus>,
) -> Result<()> {
    let _ = rocket::custom(http::config::rocket("backend/api/Rocket.toml"))
        .manage(config)
        .manage(schema)
        .manage(event_publisher)
        .manage(project_repository)
        .manage(project_details_repository)
        .manage(sponsor_repository)
        .manage(project_sponsor_repository)
        .manage(pending_project_leader_invitations_repository)
        .manage(ignored_github_issues_repository)
        .manage(user_info_repository)
        .manage(graphql)
        .manage(github)
        .manage(ens)
        .manage(simple_storage)
        .manage(publisher)
        .mount("/", routes![http::routes::health_check,])
        .mount(
            "/",
            routes![
                routes::graphql::graphiql,
                routes::graphql::get_graphql_handler,
                routes::graphql::post_graphql_handler
            ],
        )
        .launch()
        .await?;

    Ok(())
}