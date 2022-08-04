use super::*;
use crate::routes::{self, projects::dto::ProjectCreation};
use deathnote_contributions_feeder::{infrastructure::database, utils::caches};
use rocket::{self, serde::json::Json, Build, Rocket, State};
use std::sync::Arc;

async fn add_project(rocket_handler: &Rocket<Build>, project_owner: &str, project_name: &str) {
	let database: &State<Arc<database::Client>> = State::get(rocket_handler).unwrap();

	let result = routes::new_project(
		api_key(),
		Json(ProjectCreation {
			owner: project_owner,
			name: project_name,
		}),
		database,
	)
	.await;

	assert!(result.is_ok(), "{:?}", result.err().unwrap());
}

pub async fn add_all_projects(rocket_handler: &Rocket<Build>) {
	add_project(rocket_handler, "onlydustxyz", "starkonquest").await;
	add_project(rocket_handler, "onlydustxyz", "starklings").await;
}

pub async fn list_all_projects(rocket_handler: &Rocket<Build>) -> String {
	let database: &State<Arc<database::Client>> = State::get(rocket_handler).unwrap();
	let repo_cache: &State<caches::RepoCache> = State::get(rocket_handler).unwrap();
	let contributor_cache: &State<caches::ContributorCache> = State::get(rocket_handler).unwrap();

	let result = routes::list_projects(database, repo_cache, contributor_cache).await;
	assert!(result.is_ok(), "{}", result.err().unwrap());
	serde_json::to_string(&result.unwrap().0).unwrap()
}
