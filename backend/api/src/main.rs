use std::sync::Arc;

use anyhow::Result;
use api::{
	infrastructure::database::{
		PendingProjectLeaderInvitationsRepository, ProjectDetailsRepository, UserInfoRepository,
	},
	presentation::{graphql, http},
	Config,
};
use domain::AggregateRootRepository;
use dotenv::dotenv;
use infrastructure::{amqp, config, database, github, tracing::Tracer, web3::ens};
use olog::info;
use tracing::instrument;

#[tokio::main]
#[instrument]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("backend/api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "api")?;

	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	database.run_migrations()?;

	let github = Arc::new(github::Client::new(config.github())?);

	http::serve(
		config.http().clone(),
		graphql::create_schema(),
		Arc::new(amqp::Bus::default(config.amqp()).await?),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		ProjectDetailsRepository::new(database.clone()),
		PendingProjectLeaderInvitationsRepository::new(database.clone()),
		UserInfoRepository::new(database),
		github,
		Arc::new(ens::Client::new(config.web3())?),
	)
	.await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
