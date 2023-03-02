use std::sync::Arc;

use anyhow::Result;
use api::{
	infrastructure::{
		database::{
			GithubRepoRepository, PendingProjectLeaderInvitationsRepository,
			ProjectDetailsRepository, ProjectGithubRepoRepository, ProjectSponsorRepository,
			SponsorRepository, UserInfoRepository,
		},
		simple_storage,
	},
	presentation::{graphql, http},
	Config,
};
use domain::AggregateRootRepository;
use dotenv::dotenv;
use infrastructure::{amqp, config, database, github, tracing::Tracer, web3::ens};
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

	let github = Arc::new(github::Client::new(config.github())?);
	let simple_storage = Arc::new(simple_storage::Client::new(config.s3()).await?);

	http::serve(
		config.http().clone(),
		graphql::create_schema(),
		Arc::new(amqp::Bus::new(config.amqp()).await?),
		AggregateRootRepository::new(database.clone()),
		ProjectDetailsRepository::new(database.clone()),
		GithubRepoRepository::new(database.clone()),
		ProjectGithubRepoRepository::new(database.clone()),
		SponsorRepository::new(database.clone()),
		ProjectSponsorRepository::new(database.clone()),
		PendingProjectLeaderInvitationsRepository::new(database.clone()),
		UserInfoRepository::new(database),
		github,
		Arc::new(ens::Client::new(config.web3())?),
		simple_storage,
	)
	.await?;

	info!("👋 Gracefully shut down");
	Ok(())
}
