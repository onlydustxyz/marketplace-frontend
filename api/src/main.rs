use anyhow::Result;
use api::{
	infrastructure::database::{ProjectDetailsRepository, UserInfoRepository},
	presentation::{graphql, http},
	Config,
};
use domain::{AggregateRootRepository, RandomUuidGenerator};
use dotenv::dotenv;
use infrastructure::{amqp, config, database, graphql::HasuraClient, tracing::Tracer};
use log::info;
use std::sync::Arc;
use tracing::instrument;

#[tokio::main]
#[instrument]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "api")?;

	let database = Arc::new(database::Client::new(database::init_pool(
		config.database(),
	)?));
	database.run_migrations()?;

	http::serve(
		config.http().clone(),
		graphql::create_schema(),
		Arc::new(RandomUuidGenerator),
		Arc::new(amqp::Bus::default(config.amqp()).await?),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		Arc::new(HasuraClient::new(config.graphql())),
		Arc::new(ProjectDetailsRepository::new(database.clone())),
		Arc::new(UserInfoRepository::new(database)),
	)
	.await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
