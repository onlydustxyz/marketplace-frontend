use std::sync::Arc;

use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::serde::json::Json;
use rocket::State;
use serde::{Deserialize, Serialize};
use url::Url;

use common_domain::GithubUserId;
use olog::{error, IntoField};

use crate::presentation::http::github_client_pat_factory::GithubClientPatFactory;
use crate::presentation::http::option_github_pat::OptionGithubPat;

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub id: i64,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

impl From<domain::GithubUser> for Response {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id.into(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}

#[get("/api/users/<user_id>")]
pub async fn fetch_user_details_by_id(
	user_id: i64,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let user_id = GithubUserId::from(user_id);
	let user_details = github_client_factory
		.github_service()?
		.user_by_id(&user_id)
		.await
		.map(Into::into)
		.map_err(|e| {
			let error_message = format!("Failed to fetch user details for id {:}", user_id.clone());
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
	Ok(Json(user_details))
}

#[get("/api/users/search?<query>&<sort>&<order>&<per_page>&<page>")]
pub async fn search_users(
	option_github_pat: OptionGithubPat,
	query: String,
	sort: Option<String>,
	order: Option<String>,
	per_page: Option<i32>,
	page: Option<i32>,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Result<Json<Vec<Response>>, HttpApiProblem> {
	let users = github_client_factory
		.github_service_with_user_pat(option_github_pat)?
		.users(
			&query,
			sort,
			order,
			per_page.and_then(|n| u8::try_from(n).ok()),
			page.and_then(|n| u32::try_from(n).ok()),
		)
		.await
		.map(|users| users.into_iter().map(Into::into).collect())
		.map_err(|e| {
			let error_message = format!("Failed to search users");
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
	Ok(Json(users))
}
