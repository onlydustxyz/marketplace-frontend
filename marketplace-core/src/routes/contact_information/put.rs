use std::sync::Arc;

use http_api_problem::HttpApiProblem;
use marketplace_domain::ContactInformationService;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct PutContributorDto {
	discord_handle: Option<String>,
}

#[openapi(tag = "Contributors")]
#[put(
	"/contributors/<contributor_id>/contact-information",
	format = "application/json",
	data = "<body>"
)]
pub fn put_contact_information(
	contributor_id: U256Param,
	body: Json<PutContributorDto>,
	contact_information_service: &State<Arc<dyn ContactInformationService>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let body = body.into_inner();
	let discord_handle = body.discord_handle;

	contact_information_service
		.set_contributor_contact_information(&contributor_id.into(), discord_handle)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use http_api_problem::StatusCode;
	use marketplace_domain::*;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	const CONTRIBUTOR_ID: &str = "0x123";

	#[test]
	fn put_contact_information_should_forward_error_as_500() {
		let mut contact_information_service = MockContactInformationService::new();

		contact_information_service
			.expect_set_contributor_contact_information()
			.with(
				eq(ContributorId::from_str(CONTRIBUTOR_ID).unwrap()),
				eq(None),
			)
			.returning(|_, _| {
				Err(ContactInformationRepositoryError::Infrastructure(Box::new(Error)).into())
			});

		let rocket = rocket::build()
			.manage(Arc::new(contact_information_service) as Arc<dyn ContactInformationService>);

		let result = put_contact_information(
			U256Param::from_str(CONTRIBUTOR_ID).unwrap(),
			PutContributorDto {
				discord_handle: None,
			}
			.into(),
			State::get(&rocket).unwrap(),
		);
		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::INTERNAL_SERVER_ERROR, problem.status.unwrap());
		assert_eq!(
			"Something happend at the infrastructure level",
			problem.title.as_ref().unwrap()
		);
		assert_eq!("Oops", problem.detail.as_ref().unwrap());
	}

	#[test]
	fn put_contact_information_should_update_contact_information() {
		let mut contact_information_service = MockContactInformationService::new();

		contact_information_service
			.expect_set_contributor_contact_information()
			.with(
				eq(ContributorId::from_str(CONTRIBUTOR_ID).unwrap()),
				eq(Some(String::from("discord"))),
			)
			.returning(|_, _| Ok(()));

		let rocket = rocket::build()
			.manage(Arc::new(contact_information_service) as Arc<dyn ContactInformationService>);

		let result = put_contact_information(
			U256Param::from_str(CONTRIBUTOR_ID).unwrap(),
			PutContributorDto {
				discord_handle: Some(String::from("discord")),
			}
			.into(),
			State::get(&rocket).unwrap(),
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(status::NoContent, result.unwrap());
	}
}
