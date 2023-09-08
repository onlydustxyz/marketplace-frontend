use domain::{AggregateRootRepository, Project};
use http_api_problem::{HttpApiProblem, StatusCode};
use olog::IntoField;
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::State;
use uuid::Uuid;

use crate::{application, domain::permissions::IntoPermission};

#[allow(clippy::result_large_err)]
#[post("/projects/<project_id>/contributions/<contribution_id>/ignore")]
pub fn ignore(
	_api_key: ApiKey,
	project_id: Uuid,
	contribution_id: String,
	claims: Claims,
	role: Role,
	ignored_contributions_usecase: application::project::ignored_contributions::Usecase,
	project_repository: &State<AggregateRootRepository<Project>>,
) -> Result<(), HttpApiProblem> {
	let project_id = project_id.into();
	let caller_id = claims.user_id;

	println!("{}", serde_json::to_string_pretty(&claims).unwrap());

	if !role
		.to_permissions((*project_repository).clone())
		.can_ignore_issue_for_project(&project_id)
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on issue")
			.detail(format!(
				"User {caller_id} needs project lead role to ignore a contribution on project {project_id}"
			)));
	}

	ignored_contributions_usecase.add(project_id, contribution_id).map_err(|e| {
		olog::error!(error = e.to_field(), "Unable to ignore contribution");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Unable to ignore contribution")
			.detail(e.to_string())
	})?;

	Ok(())
}

#[allow(clippy::result_large_err)]
#[delete("/projects/<project_id>/contributions/<contribution_id>/ignore")]
pub fn unignore(
	_api_key: ApiKey,
	project_id: Uuid,
	contribution_id: String,
	claims: Claims,
	role: Role,
	ignored_contributions_usecase: application::project::ignored_contributions::Usecase,
	project_repository: &State<AggregateRootRepository<Project>>,
) -> Result<(), HttpApiProblem> {
	let project_id = project_id.into();
	let caller_id = claims.user_id;

	if !role
		.to_permissions((*project_repository).clone())
		.can_ignore_issue_for_project(&project_id)
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on issue")
			.detail(format!(
				"User {caller_id} needs project lead role to unignore a contribution on project {project_id}"
			)));
	}

	ignored_contributions_usecase.remove(project_id, contribution_id).map_err(|e| {
		olog::error!(error = e.to_field(), "Unable to ignore contribution");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Unable to unignore contribution")
			.detail(e.to_string())
	})?;

	Ok(())
}
