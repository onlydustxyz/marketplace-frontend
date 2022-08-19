use http_api_problem::{HttpApiProblem, StatusCode};
use marketplace_backend::dto;
use onlydust_domain::ContactInformationService;
use rocket::{get, serde::json::Json, State};
use rocket_okapi::openapi;
use std::{result::Result, sync::Arc};

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[openapi(tag = "Contributors")]
#[get("/contributors/<contributor_id>/contact-information")]
pub fn find_contact_information(
	contact_information_service: &State<Arc<dyn ContactInformationService>>,
	contributor_id: U256Param,
) -> Result<Json<dto::ContactInformation>, HttpApiProblem> {
	let contact_information = contact_information_service
		.get_contributor_contact_information(&contributor_id.into())
		.map_err(|e| e.to_http_api_problem())?;

	match contact_information {
		Some(contact_information) => Ok(Json(contact_information.into())),
		None => Err(HttpApiProblem::new(StatusCode::NOT_FOUND)
			.title("Contributor's contact information not found")),
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use mockall::predicate::*;
	use onlydust_domain::*;
	use thiserror::Error;
	use uuid::Uuid;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	const CONTRIBUTOR_ID: &str = "0x123";

	#[test]
	fn find_contact_information_should_return_404_when_contact_information_not_found() {
		let mut contact_information_service = MockContactInformationService::new();
		contact_information_service
			.expect_get_contributor_contact_information()
			.with(eq(ContributorId::from_str(CONTRIBUTOR_ID).unwrap()))
			.returning(|_| Ok(None));

		let rocket = rocket::build()
			.manage(Arc::new(contact_information_service) as Arc<dyn ContactInformationService>);

		let result = find_contact_information(
			State::get(&rocket).unwrap(),
			U256Param::from_str(CONTRIBUTOR_ID).unwrap(),
		);
		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::NOT_FOUND, problem.status.unwrap());
		assert_eq!(
			"Contributor's contact information not found",
			problem.title.as_ref().unwrap()
		);
	}

	#[test]
	fn find_contact_information_should_forward_error_as_500() {
		let mut contact_information_service = MockContactInformationService::new();

		contact_information_service
			.expect_get_contributor_contact_information()
			.with(eq(ContributorId::from_str(CONTRIBUTOR_ID).unwrap()))
			.returning(|_| {
				Err(ContactInformationRepositoryError::Infrastructure(Box::new(Error)).into())
			});

		let rocket = rocket::build()
			.manage(Arc::new(contact_information_service) as Arc<dyn ContactInformationService>);

		let result = find_contact_information(
			State::get(&rocket).unwrap(),
			U256Param::from_str(CONTRIBUTOR_ID).unwrap(),
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
	fn find_contact_information_should_return_contact_information_if_found() {
		let mut contact_information_service = MockContactInformationService::new();

		contact_information_service
			.expect_get_contributor_contact_information()
			.with(eq(ContributorId::from_str(CONTRIBUTOR_ID).unwrap()))
			.returning(|_| {
				Ok(Some(ContactInformation {
					id: Uuid::new_v4().into(),
					contributor_id: ContributorId::from_str(CONTRIBUTOR_ID).unwrap(),
					discord_handle: Some(String::from("discord")),
				}))
			});

		let rocket = rocket::build()
			.manage(Arc::new(contact_information_service) as Arc<dyn ContactInformationService>);

		let result = find_contact_information(
			State::get(&rocket).unwrap(),
			U256Param::from_str(CONTRIBUTOR_ID).unwrap(),
		);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		let contributor = result.unwrap();
		assert_eq!(
			"0x0000000000000000000000000000000000000000000000000000000000000123",
			contributor.contributor_id
		);
		assert_eq!(Some(String::from("discord")), contributor.discord_handle);
	}
}
