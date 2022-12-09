use crate::{domain::ProjectDetails, presentation::graphql};
use ::domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Project, Publisher,
	UniqueMessage, UserRepository, UuidGenerator,
};
use anyhow::Result;
use rocket::figment::{
	providers::{Env, Format, Toml},
	Figment,
};
use std::sync::Arc;

mod routes;

#[allow(clippy::too_many_arguments)]
pub async fn serve(
	schema: graphql::Schema,
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	payment_repository: AggregateRootRepository<Payment>,
	budget_repository: AggregateRootRepository<Budget>,
	user_repository: Arc<dyn UserRepository>,
	project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>,
) -> Result<()> {
	let _ = rocket::custom(rocket_config())
		.manage(schema)
		.manage(uuid_generator)
		.manage(event_publisher)
		.manage(project_repository)
		.manage(payment_repository)
		.manage(budget_repository)
		.manage(user_repository)
		.manage(project_details_repository)
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
		.launch()
		.await?;

	Ok(())
}

fn rocket_config() -> Figment {
	Figment::from(rocket::Config::default())
		.merge(Toml::file("api/Rocket.toml").nested())
		.merge(Env::prefixed("ROCKET_").global())
}
