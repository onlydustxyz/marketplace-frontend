use crate::routes::to_http_api_problem::ToHttpApiProblem;
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use log::error;
use marketplace_core::dto;
use marketplace_domain::*;
use rocket::{get, serde::json::Json, State};
use rocket_okapi::openapi;
use std::{result::Result, sync::Arc};
use url::Url;

#[openapi(tag = "Projects")]
#[get("/projects")]
pub async fn list_projects(
	project_projection_repository: &State<Arc<dyn ProjectProjectionRepository>>,
	contribution_projection_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	project_member_projection_repository: &State<Arc<dyn ProjectMemberProjectionRepository>>,
	lead_contributor_projection_repository: &State<Arc<dyn LeadContributorProjectionRepository>>,
	contributor_projection_repository: &State<Arc<dyn ContributorProjectionRepository>>,
) -> Result<Json<Vec<dto::Project>>, HttpApiProblem> {
	let projects = project_projection_repository
		.list()
		.map_err(|e| e.to_http_api_problem())?
		.into_iter()
		.map(|project| {
			build_project(
				project,
				contribution_projection_repository.inner(),
				project_member_projection_repository.inner(),
				lead_contributor_projection_repository.inner(),
				contributor_projection_repository.inner(),
			)
		})
		.filter_map(|result| match result {
			Ok(project) => Some(project),
			Err(e) => {
				error!("Failed to build project dto: {e}");
				None
			},
		})
		.collect();

	Ok(Json(projects))
}

fn build_project(
	project: ProjectProjection,
	contribution_projection_repository: &Arc<dyn ContributionProjectionRepository>,
	project_member_projection_repository: &Arc<dyn ProjectMemberProjectionRepository>,
	lead_contributor_projection_repository: &Arc<dyn LeadContributorProjectionRepository>,
	contributor_projection_repository: &Arc<dyn ContributorProjectionRepository>,
) -> Result<dto::Project, HttpApiProblem> {
	let contributions = contribution_projection_repository
		.list_by_project(&project.id)
		.map_err(|e| e.to_http_api_problem())?
		.into_iter()
		.filter_map(|contribution| {
			build_contribution(contribution, contributor_projection_repository)
		})
		.collect();

	let members = project_member_projection_repository
		.list_by_project(&project.id)
		.map_err(|e| e.to_http_api_problem())?;

	let lead_contributors = lead_contributor_projection_repository
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
		lead_contributors: lead_contributors.into_iter().map(|l| l.account().to_string()).collect(),
		members: members.into_iter().map(|m| m.contributor_account().to_string()).collect(),
	};

	Ok(project)
}

fn build_contribution(
	contribution: ContributionProjection,
	contributor_projection_repository: &Arc<dyn ContributorProjectionRepository>,
) -> Option<dto::Contribution> {
	let contributor = contribution
		.contributor_id
		.clone()
		.and_then(|id| contributor_projection_repository.find_by_id(&id).ok());

	let mut contribution = dto::Contribution::from(contribution);
	contribution.metadata.github_username = contributor.map(|c| c.github_username);
	Some(contribution)
}
