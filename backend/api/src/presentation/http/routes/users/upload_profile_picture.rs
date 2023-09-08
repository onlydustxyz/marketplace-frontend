use std::{io::Cursor, sync::Arc};

use domain::LogErr;
use http_api_problem::HttpApiProblem;
use image::{imageops::FilterType, GenericImageView};
use olog::IntoField;
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
#[serde(rename_all = "camelCase")]
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
		.to_vec()
		.try_to_webp()
		.log_err(|e| olog::error!(error = e.to_field(), "Could not decode profile picture"))
		.map_err(|_| {
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title("Internal error")
				.detail("Could not decode profile picture")
		})?;

	let usecase = application::user::update_profile_info::Usecase::new(
		user_profile_info_repository.inner().clone(),
		contact_informations_repository.inner().clone(),
		simple_storage.inner().clone(),
	);

	let picture_url = usecase
		.update_user_avatar(user_id.into(), profile_picture)
		.await
		.map_err(Error::from)?;

	Ok(Json(Response { picture_url }))
}

fn profile_picture_size_limit() -> ByteUnit {
	std::env::var("PROFILE_PICTURE_SIZE_LIMIT")
		.unwrap_or_default()
		.parse::<u64>()
		.unwrap_or(3)
		.mebibytes()
}

trait TryToWebp
where
	Self: Sized,
{
	type Error;
	fn try_to_webp(self) -> Result<Self, Self::Error>;
}

impl TryToWebp for Vec<u8> {
	type Error = anyhow::Error;

	fn try_to_webp(self) -> anyhow::Result<Self> {
		let img = image::io::Reader::new(Cursor::new(self)).with_guessed_format()?.decode()?;

		let (width, height) = img.dimensions();
		let img = if width > 1024 || height > 1024 {
			img.resize(1024, 1024, FilterType::Lanczos3)
		} else {
			img
		};

		let mut bytes: Vec<u8> = Vec::new();
		img.write_to(&mut Cursor::new(&mut bytes), image::ImageOutputFormat::WebP)?;

		Ok(bytes)
	}
}
