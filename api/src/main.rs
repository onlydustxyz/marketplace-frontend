use ::domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Project, Publisher,
	RandomUuidGenerator, UniqueMessage, UserRepository, UuidGenerator,
};
use ::infrastructure::{
	amqp::Bus,
	config,
	database::{self, init_pool},
	graphql::HasuraClient,
};
use anyhow::Result;
use api::{
	domain::ProjectDetails, graphql, infrastructure::database::ProjectDetailsRepository, routes,
	Config,
};
use dotenv::dotenv;
use infrastructure::tracing::Tracer;
use log::info;
use rocket::{
	figment::{
		providers::{Env, Format, Toml},
		Figment,
	},
	routes, Build, Rocket,
};
use std::sync::Arc;
use tracing::instrument;

#[tokio::main]
#[instrument]
async fn main() -> Result<()> {
	dotenv().ok();
	let config: Config = config::load("api/app.yaml")?;
	let _tracer = Tracer::init(config.tracer(), "api")?;

	let database = Arc::new(database::Client::new(init_pool(config.database())?));
	database.run_migrations()?;

	let rocket_handler = inject_app(
		rocket::custom(rocket_config()),
		graphql::create_schema(),
		Arc::new(RandomUuidGenerator),
		Arc::new(Bus::default(config.amqp()).await?),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		Arc::new(HasuraClient::new(config.graphql())),
		Arc::new(ProjectDetailsRepository::new(database)),
	)
	.attach(routes::cors::Cors)
	.mount(
		"/",
		routes![
			routes::cors::options_preflight_handler,
			routes::health::health_check,
		],
	)
	.mount(
		"/",
		routes![
			routes::graphql::graphiql,
			routes::graphql::get_graphql_handler,
			routes::graphql::post_graphql_handler
		],
	)
	.launch();

	let (rocket_result,) = tokio::join!(rocket_handler);
	let _ = rocket_result?;

	info!("👋 Gracefully shut down");
	Ok(())
}

#[allow(clippy::too_many_arguments)]
fn inject_app(
	rocket: Rocket<Build>,
	schema: graphql::Schema,
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	payment_repository: AggregateRootRepository<Payment>,
	budget_repository: AggregateRootRepository<Budget>,
	user_repository: Arc<dyn UserRepository>,
	project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>,
) -> Rocket<Build> {
	rocket
		.manage(schema)
		.manage(uuid_generator)
		.manage(event_publisher)
		.manage(project_repository)
		.manage(payment_repository)
		.manage(budget_repository)
		.manage(user_repository)
		.manage(project_details_repository)
}

fn rocket_config() -> Figment {
	Figment::from(rocket::Config::default())
		.merge(Toml::file("api/Rocket.toml").nested())
		.merge(Env::prefixed("ROCKET_"))
}
