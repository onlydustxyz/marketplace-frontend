use std::sync::Arc;

use anyhow::Result;
use api::{
	infrastructure::{
		database::{
			IgnoredGithubIssuesRepository, PendingProjectLeaderInvitationsRepository,
			ProjectDetailsRepository, ProjectSponsorRepository, SponsorRepository,
			TermsAndConditionsAcceptanceRepository, UserInfoRepository,
		},
		simple_storage,
	},
	presentation::{graphql, http},
	Config,
};
use domain::AggregateRootRepository;
use dotenv::dotenv;
use infrastructure::{
	amqp, config, database, github, graphql as infrastructure_graphql, tracing::Tracer, web3::ens,
};
use olog::info;

#[tokio::main]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
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
		UserInfoRepository::new(database.clone()),
		TermsAndConditionsAcceptanceRepository::new(database),
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
