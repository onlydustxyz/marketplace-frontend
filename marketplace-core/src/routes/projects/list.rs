use crate::routes::to_http_api_problem::ToHttpApiProblem;
use futures::future::{self, OptionFuture};
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use log::error;
use marketplace_core::{dto, utils::caches};
use marketplace_domain::*;
use marketplace_infrastructure::{github, starknet};
use rocket::{get, serde::json::Json, State};
use rocket_okapi::openapi;
use std::{result::Result, sync::Arc};
use url::Url;

#[openapi(tag = "Projects")]
#[get("/projects")]
pub async fn list_projects(
	contributor_cache: &State<caches::ContributorCache>,
	project_projection_repository: &State<Arc<dyn ProjectProjectionRepository>>,
	contribution_projection_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	project_member_projection_repository: &State<Arc<dyn ProjectMemberProjectionRepository>>,
) -> Result<Json<Vec<dto::Project>>, HttpApiProblem> {
	let build_project_tasks = project_projection_repository
		.list()
		.map_err(|e| e.to_http_api_problem())?
		.into_iter()
		.map(|project| {
			build_project(
				project,
				contribution_projection_repository,
				project_member_projection_repository,
				contributor_cache,
			)
		});

	// Merge all tasks into a single vector
	// Failed task will be ignored
	let projects = future::join_all(build_project_tasks)
		.await
		.into_iter()
		.filter_map(|result| match result {
			Ok(opt_project) => opt_project,
			Err(e) => {
				error!("Failed to join 'build project dto' task: {e}");
				None
			},
		})
		.collect();

	Ok(Json(projects))
}

async fn build_project(
	project: ProjectProjection,
	contribution_projection_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	project_member_projection_repository: &State<Arc<dyn ProjectMemberProjectionRepository>>,
	contributor_cache: &caches::ContributorCache,
) -> Result<Option<dto::Project>, HttpApiProblem> {
	let contributions = contribution_projection_repository
		.list_by_project(&project.id)
		.map_err(|e| e.to_http_api_problem())?;

	// Spawn concurent tasks
	// One for each contribution
	let build_contribution_tasks = contributions.into_iter().map(|contribution| {
		let cloned_contributor_cache = contributor_cache.clone();
		tokio::spawn(
			async move { build_contribution(contribution, &cloned_contributor_cache).await },
		)
	});

	// Merge all tasks into a single vector
	// Failed task will be ignored
	let contributions = future::join_all(build_contribution_tasks)
		.await
		.into_iter()
		.filter_map(|result| match result {
			Ok(opt_project) => opt_project,
			Err(e) => {
				error!("Failed to join 'build contribution DTO' task: {e}");
				None
			},
		})
		.collect();

	let members = project_member_projection_repository
		.list_by_project(&project.id)
		.map_err(|e| e.to_http_api_problem())?;

	let project = dto::Project {
		id: project.id.to_string(),
		title: project.name.clone(),
		description: project.description,
		logo: project.logo_url,
		github_link: project.url.unwrap_or_else(|| {
			Url::parse(&format!(
				"https://github.com/{}/{}",
				project.owner, project.name
			))
			.unwrap()
		}),
		contributions,
		members: members.into_iter().map_into().collect_vec(),
	};

	Ok(Some(project))
}

async fn build_contribution(
	contribution: ContributionProjection,
	contributor_cache: &caches::ContributorCache,
) -> Option<dto::Contribution> {
	let contributor = OptionFuture::from(
		contribution
			.contributor_id
			.clone()
			.map(|id| build_contributor(contributor_cache, id)),
	)
	.await
	.flatten();

	let mut contribution = dto::Contribution::from(contribution);

	if contributor.is_some() {
		contribution.metadata.github_username = contributor.unwrap().github_username;
	}

	Some(contribution)
}

async fn build_contributor(
	contributor_cache: &caches::ContributorCache,
	contributor_id: ContributorId,
) -> Option<Contributor> {
	contributor_cache
		.inner_ref()
		.get_or_insert(&contributor_id, || async {
			fetch_contributor(&contributor_id).await
		})
		.await
}

async fn fetch_contributor(contributor_id: &ContributorId) -> Option<Contributor> {
	let starknet = starknet::Client::default();
	let mut contributor = starknet.get_user_information(contributor_id).await?;

	if let Some(github_handle) = &contributor.github_handle {
		let github_user = match github::Client::new().user(github_handle).await {
			Ok(user) => Some(user),
			Err(_) => None,
		};

		contributor.github_username = github_user.map(|u| u.login);
	}

	Some(contributor)
}
