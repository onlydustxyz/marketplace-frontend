use std::sync::Arc;

use ::domain::{AggregateRootRepository, Event, Payment, Project, Publisher};
use anyhow::Result;
use http::Config;
use infrastructure::{amqp::UniqueMessage, github, web3::ens};
use presentation::http;

use crate::{
	infrastructure::database::{
		PendingProjectLeaderInvitationsRepository, ProjectDetailsRepository, UserInfoRepository,
	},
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
	project_details_repository: ProjectDetailsRepository,
	pending_project_leader_invitations_repository: PendingProjectLeaderInvitationsRepository,
	user_info_repository: UserInfoRepository,
	github: Arc<github::Client>,
	ens: Arc<ens::Client>,
) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/api/Rocket.toml"))
		.manage(config)
		.manage(schema)
		.manage(event_publisher)
		.manage(project_repository)
		.manage(payment_repository)
		.manage(project_details_repository)
		.manage(pending_project_leader_invitations_repository)
		.manage(user_info_repository)
		.manage(github)
		.manage(ens)
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
