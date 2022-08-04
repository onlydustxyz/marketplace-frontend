use crate::routes::api_key::ApiKey;
use deathnote_contributions_feeder::{
	github,
	infrastructure::{database, starknet},
	utils::caches::{ContributorCache, RepoCache},
};
use dotenv::dotenv;
use rocket::{self, Build, Rocket};
use rstest::*;
use std::sync::Arc;

#[fixture]
pub fn github_client() -> github::API {
	dotenv().ok();
	github::API::initialize();
	github::API::new()
}

#[fixture]
pub fn starknet_client() -> starknet::SingleAdminClient {
	starknet::Client::default()
}

#[fixture]
pub fn database_client() -> database::Client {
	dotenv().ok();
	database::Client::default()
}

#[fixture]
pub fn rocket_handler(
	github_client: github::API,
	database_client: database::Client,
) -> Rocket<Build> {
	rocket::build()
		.manage(Arc::new(database_client))
		.manage(RepoCache::default())
		.manage(ContributorCache::default())
		.manage(github_client)
}

#[fixture]
pub fn api_key() -> ApiKey {
	ApiKey::default()
}
