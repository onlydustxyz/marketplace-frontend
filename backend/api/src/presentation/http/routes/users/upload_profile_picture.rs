use std::sync::Arc;

use http_api_problem::HttpApiProblem;
use presentation::http::guards::Claims;
use reqwest::StatusCode;
use rocket::{
	data::{ByteUnit, Data, ToByteUnit},
	serde::json::Json,
	State,
};
use serde::Serialize;
use url::Url;

use crate::{
	application, infrastructure::simple_storage, models::*, presentation::http::error::Error,
};

#[derive(Debug, Serialize)]
pub struct Response {
	picture_url: Url,
}

#[post("/users/profile_picture", data = "<profile_picture>")]
pub async fn profile_picture(
	claims: Claims,
	user_profile_info_repository: &State<Arc<dyn UserProfileInfoRepository>>,
	contact_informations_repository: &State<Arc<dyn ContactInformationsRepository>>,
	simple_storage: &State<Arc<simple_storage::Client>>,
	profile_picture: Data<'_>,
) -> Result<Json<Response>, HttpApiProblem> {
	let user_id = claims.user_id;

	let profile_picture = profile_picture
		.open(profile_picture_size_limit())
		.into_bytes()
		.await
		.map_err(|e| {
			HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Unable to open profile picture")
				.detail(e.to_string())
		})?
		.to_vec();

	let usecase = application::user::update_profile_info::Usecase::new(
		user_profile_info_repository.inner().clone(),
		contact_informations_repository.inner().clone(),
		simple_storage.inner().clone(),
	);

	let picture_url = usecase
		.update_user_avatar(user_id.into(), profile_picture)
		.await
		.map_err(Error::from)?;

	let res = Response { picture_url };

	warn!("{:?}", serde_json::to_string(&res));
	Ok(Json(res))
}

fn profile_picture_size_limit() -> ByteUnit {
	std::env::var("PROFILE_PICTURE_SIZE_LIMIT")
		.unwrap_or_default()
		.parse::<u64>()
		.unwrap_or(3)
		.mebibytes()
}
