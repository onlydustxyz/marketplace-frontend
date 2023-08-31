use std::collections::HashMap;

use domain::Languages;
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::Claims;
use rocket::{serde::json::Json, State};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, models::ContactInformation, presentation::http::dto};

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub user_id: Uuid,
}

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Request {
	bio: Option<String>,
	location: Option<String>,
	website: Option<String>,
	languages: Option<Vec<dto::Language>>,
	weekly_allocated_time: dto::AllocatedTime,
	looking_for_a_job: bool,
	contact_informations: Vec<dto::ContactInformation>,
	cover: Option<dto::ProfileCover>,
}

#[post("/users/profile", data = "<request>", format = "application/json")]
pub async fn update_user_profile(
	claims: Claims,
	request: Json<Request>,
	update_user_profile_info_usecase: &State<application::user::update_profile_info::Usecase>,
) -> Result<Json<Response>, HttpApiProblem> {
	let caller_id = claims.user_id;

	let request = request.into_inner();

	let languages: Option<HashMap<String, i32>> = request.languages.map(|languages| {
		languages.into_iter().map(|language| (language.name, language.weight)).collect()
	});

	update_user_profile_info_usecase
		.update_user_profile_info(
			caller_id.into(),
			request.bio.clone(),
			request.location,
			request.website,
			languages.map(Languages::from),
			request.weekly_allocated_time.into(),
			request.looking_for_a_job,
			request
				.contact_informations
				.into_iter()
				.map(|info| ContactInformation {
					user_id: caller_id.into(),
					channel: info.channel.into(),
					contact: info.contact,
					public: info.public,
				})
				.collect(),
			request.cover.map(dto::ProfileCover::into),
		)
		.await
		.map_err(|e| {
			{
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Unable to process create_project request")
					.detail(e.to_string())
			}
		})?;

	Ok(Json(Response { user_id: caller_id }))
}
