use std::sync::Arc;

use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::serde::json::Json;
use rocket::State;
use url::Url;
use olog::{error, IntoField};
use common_domain::GithubUserId;
use serde::{Deserialize, Serialize};
use crate::presentation::http::github_client_pat_factory::GithubClientPatFactory;

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
