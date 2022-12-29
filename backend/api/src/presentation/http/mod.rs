use std::sync::Arc;

use ::domain::{
	AggregateRootRepository, Budget, Event, Payment, Project, Publisher, UniqueMessage,
};
use anyhow::Result;
use http::Config;
use infrastructure::github;
use presentation::http;

use crate::{
	infrastructure::database::{ProjectDetailsRepository, UserInfoRepository},
	presentation::graphql,
};

pub mod dto;
pub mod roles;
mod routes;

#[allow(clippy::too_many_arguments)]
pub async fn serve(
	config: Config,
	schema: graphql::Schema,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	payment_repository: AggregateRootRepository<Payment>,
	budget_repository: AggregateRootRepository<Budget>,
	project_details_repository: ProjectDetailsRepository,
	user_info_repository: UserInfoRepository,
	github: Arc<github::Client>,
) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/api/Rocket.toml"))
		.manage(config)
		.manage(schema)
		.manage(event_publisher)
		.manage(project_repository)
		.manage(payment_repository)
		.manage(budget_repository)
		.manage(project_details_repository)
		.manage(user_info_repository)
		.manage(github)
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
