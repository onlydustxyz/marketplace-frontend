//! This is the main module of the API application.
//!
//! It serves the HTTP requests and connects to various services such as databases, message brokers,
//! and cloud storage.
//!
//! # Usage
//!
//! To run the API, load the configuration from a YAML file and call the `main()` function.
//!
//! ```
//! use anyhow::Result;
//!
//! #[tokio::main]
//! async fn main() -> Result<()> {
//!     let config = api::infrastructure::config::load("backend/api/app.yaml")?;
//!     api::run(config).await
//! }
//! ```
//!
//! # Dependencies
//!
//! This module depends on the following external crates:
//!
//! - `std::sync::Arc`: Provides thread-safe reference counting pointers.
//! - `anyhow::Result`: Provides a unified error type for easy error handling.
//! - `api::infrastructure::database`: Provides access to the database layer.
//! - `api::infrastructure::simple_storage`: Provides access to the cloud storage layer.
//! - `api::presentation::graphql`: Provides the GraphQL API layer.
//! - `api::presentation::http`: Provides the HTTP server layer.
//! - `domain::AggregateRootRepository`: Provides the domain interface for aggregate root repositories.
//! - `dotenv::dotenv`: Loads environment variables from a `.env` file.
//! - `infrastructure::amqp`: Provides message broker support using AMQP.
//! - `infrastructure::config`: Provides configuration loading from YAML files.
//! - `infrastructure::github`: Provides GitHub API client support.
//! - `infrastructure::graphql`: Provides GraphQL client support.
//! - `infrastructure::tracing::Tracer`: Provides distributed tracing support using Jaeger.
//! - `infrastructure::web3::ens`: Provides Ethereum Name Service support.
//! - `olog::info`: Provides logging support.
//!
use std::sync::Arc;

use anyhow::Result;
use api::{
    infrastructure::{
        database::{
            IgnoredGithubIssuesRepository, PendingProjectLeaderInvitationsRepository,
            ProjectDetailsRepository, ProjectSponsorRepository, SponsorRepository,
            UserInfoRepository,
        },
        simple_storage,
    },
    presentation::{graphql, http},
    Config,
};
use domain::AggregateRootRepository;
use dotenv::dotenv;
use infrastructure::{
    amqp, config, database, github, graphql as infrastructure_graphql, tracing::Tracer,
    web3::ens,
};
use olog::info;

/// Runs the API using the specified configuration.
///
/// # Arguments
///
/// * `config` - The configuration of the API application.
///
/// # Examples
///
/// ```
/// use anyhow::Result;
///
/// #[tokio::main]
/// async fn main() -> Result<()> {
///     let config = api::infrastructure::config::load("backend/api/app.yaml")?;
///     api::run(config).await
/// }
/// ```
pub async fn run(config: Config) -> Result<()> {
    dotenv().ok();
    let _tracer = Tracer::init(config.tracer(), "api")?;

    let database = Arc::new(database::Client::new(database::init_pool(
        config.database(),
    )?));
    database.run_migrations()?;

    let github: github::Client = github::RoundRobinClient::new(config.github())?.into();
    let simple_storage = Arc::new(simple_storage::Client::new(config.s3()).await?);

    http::serve(
        config.http().clone(),
        graphql::create_schema(),
        Arc::new(amqp::Bus::new(config.amqp()).await?),
        AggregateRootRepository::new(database.clone()),
        ProjectDetailsRepository::new(database.clone()),
        SponsorRepository::new(database.clone()),
        ProjectSponsorRepository::new(database.clone()),
        PendingProjectLeaderInvitationsRepository::new(database.clone()),
        IgnoredGithubIssuesRepository::new(database.clone()),
        UserInfoRepository::new(database),
        Arc::new(infrastructure_graphql::Client::new(
            config.graphql_client(),
        )?),
        Arc::new(github),
        Arc::new(ens::Client::new(config.web3())?),
        simple_storage,
        Arc::new(amqp::Bus::new(config.amqp()).await?),
    )
    .await?;

    info!("👋 Gracefully shut down");
    Ok(())
}