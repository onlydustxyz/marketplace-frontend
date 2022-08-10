use deathnote_contributions_feeder::domain::{Application, ApplicationRepository, ContributorId};
use http_api_problem::HttpApiProblem;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use std::sync::Arc;

use crate::routes::{
	hex_prefixed_string::HexPrefixedString, to_http_api_problem::ToHttpApiProblem,
};

#[cfg(test)]
mod tests;

#[openapi(tag = "Applications")]
#[get("/applications?<contributor_id>")]
pub async fn list_contributor_applications(
	contributor_id: HexPrefixedString,
	database: &State<Arc<dyn ApplicationRepository>>,
) -> Result<Json<Vec<Application>>, HttpApiProblem> {
	let contributor_id: ContributorId = contributor_id.as_unprefixed_str().into();

	let applications = database
		.list_by_contributor(&contributor_id)
		.map_err(|e| e.to_http_api_problem())?;

	println!("response len = {:}", applications.len());

	Ok(Json(applications))
}
