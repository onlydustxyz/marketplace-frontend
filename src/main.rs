mod routes;

use deathnote_contributions_feeder::{
	application::*,
	domain::RandomUuidGenerator,
	github,
	infrastructure::{database, starknet},
	utils::caches::{ContributorCache, RepoCache},
};
use diesel_migrations::*;
use dotenv::dotenv;
use log::info;
use rocket::{routes, Build, Rocket};
use rocket_okapi::{openapi_get_routes, swagger_ui::make_swagger_ui};
use slog::{o, Drain, Logger};
use std::sync::{Arc, RwLock};
use tokio::{
	signal,
	sync::oneshot::{self},
};

#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel_migrations;

embed_migrations!("migrations");

fn get_root_logger() -> Logger {
	let drain = slog_async::Async::default(slog_envlogger::new(
		slog_json::Json::new(std::io::stdout()).add_default_keys().build().fuse(),
	));
	slog_stdlog::init().unwrap();
	slog::Logger::root(drain.fuse(), o!("version" => env!("CARGO_PKG_VERSION")))
}

#[tokio::main]
async fn main() {
	dotenv().ok();
	let root_logger = get_root_logger();
	let _global_logger_guard = slog_scope::set_global_logger(root_logger);
	github::API::initialize();

	let database = Arc::new(database::Client::default());
	database.run_migrations().expect("Unable to run database migrations");

	// Allow to gracefully exit kill all thread on ctrl+c
	let (shutdown_send, shutdown_recv) = oneshot::channel();
	let ctr_c_handler = tokio::spawn(async {
		let _ = signal::ctrl_c().await;
		// ctrl_c have been pushed or something unexpected happened
		let _ = shutdown_send.send(true);
	});

	// Regularly create a transaction with tasks stored in the queue
	let starknet = Arc::new(starknet::Client::default());
	let queue_handler = starknet::spawn(starknet.clone(), database.clone(), shutdown_recv);

	let uuid_generator = Arc::new(RwLock::new(RandomUuidGenerator));

	let rocket_handler = inject_app(rocket::build(), database.clone(), starknet, uuid_generator)
		.manage(database.clone())
		.manage(RepoCache::default())
		.manage(ContributorCache::default())
		.manage(github::API::new())
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
			openapi_get_routes![
				routes::new_project,
				routes::list_projects,
				routes::create_contribution,
				routes::assign_contributor,
				routes::validate_contribution,
				routes::unassign_contributor,
				routes::contributors::find_by_id,
				routes::apply_to_contribution,
			],
		)
		.mount("/swagger", make_swagger_ui(&routes::get_docs()))
		.launch();

	let (rocket_result, ctr_c_result, queue_result) =
		tokio::join!(rocket_handler, ctr_c_handler, queue_handler);
	let _ = rocket_result.unwrap();
	queue_result.unwrap();
	ctr_c_result.unwrap();

	info!("Gracefully shut down");
}

fn inject_app(
	rocket: Rocket<Build>,
	database: Arc<database::Client>,
	starknet: Arc<starknet::SingleAdminClient>,
	uuid_generator: Arc<RwLock<RandomUuidGenerator>>,
) -> Rocket<Build> {
	rocket
		.manage(GetContributor::new_usecase_boxed(database.clone()))
		.manage(CreateContribution::new_usecase_boxed(starknet.clone()))
		.manage(AssignContribution::new_usecase_boxed(
			starknet.clone(),
			database.clone(),
		))
		.manage(UnassignContribution::new_usecase_boxed(
			starknet.clone(),
			database.clone(),
		))
		.manage(ApplyToContribution::new_usecase_boxed(
			database.clone(),
			uuid_generator,
		))
		.manage(ValidateContribution::new_usecase_boxed(starknet, database))
}
