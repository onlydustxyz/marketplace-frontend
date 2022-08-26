use crate::routes::api_key::ApiKey;
use http_api_problem::{HttpApiProblem, StatusCode};
use marketplace_core::{application::CreateContributionUsecase, dto::ContributionCreation};
use marketplace_domain::*;
use marketplace_infrastructure::github;
use rocket::{http::Status, serde::json::Json, State};
use rocket_okapi::openapi;
use std::result::Result;

#[openapi(tag = "Contributions")]
#[post("/contributions/github", format = "application/json", data = "<body>")]
pub async fn create_contribution(
	_api_key: ApiKey,
	body: Json<ContributionCreation>,
	github_api: &State<github::Client>,
	usecase: &State<Box<dyn CreateContributionUsecase>>,
) -> Result<Status, HttpApiProblem> {
	let body = body.into_inner();

	let github_issue = github_api.issue(body.project_id(), body.github_issue_number()).await;
	let github_issue = match github_issue {
		Ok(github_issue) => github_issue,
		Err(error) =>
			return Err(HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Unable to get GitHub issue data")
				.detail(error.to_string())),
	};

	let metadata = github::extract_metadata(&github_issue.issue);

	let contribution = Contribution {
		project_id: body.project_id().to_string(),
		contributor_id: None,
		title: Some(github_issue.issue.title),
		description: github_issue.issue.body,
		status: ContributionStatus::Open,
		external_link: Some(github_issue.issue.html_url),
		gate: body.gate(),
		metadata,
		..Default::default()
	};

	usecase.send_creation_request(contribution).map_err(|error| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Unable to add contribution to the queue")
			.detail(error.to_string())
	})?;

	Ok(Status::Accepted)
}
