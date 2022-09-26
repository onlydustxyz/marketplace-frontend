use http_api_problem::HttpApiProblem;
use marketplace_core::application::ValidateContributionUsecase;
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{
	api_key::ApiKey, hex_prefixed_string::HexPrefixedStringDto,
	to_http_api_problem::ToHttpApiProblem,
};

#[openapi(tag = "Contributions")]
#[post("/contributions/<contribution_id>/validate")]
pub async fn validate_contribution(
	_api_key: ApiKey,
	contribution_id: HexPrefixedStringDto,
	usecase: &State<Box<dyn ValidateContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contribution_id = contribution_id.into();

	usecase
		.send_validate_request(&contribution_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use http_api_problem::StatusCode;
	use marketplace_core::application::MockValidateContribution;
	use marketplace_domain::*;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[tokio::test]
	async fn validate_should_return_accepted_upon_success() {
		let mut usecase = MockValidateContribution::new();

		usecase
			.expect_send_validate_request()
			.with(eq(ContributionId::from_str("0x12").unwrap()))
			.returning(|_| Ok(HexPrefixedString::default()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			HexPrefixedStringDto::from_str("0x12").unwrap(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn validate_should_return_500_upon_failure() {
		let mut usecase = MockValidateContribution::new();

		usecase.expect_send_validate_request().returning(|_| {
			Err(ContributionProjectionRepositoryError::Infrastructure(Box::new(Error)).into())
		});

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			HexPrefixedStringDto::from_str("0x12").unwrap(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::INTERNAL_SERVER_ERROR, problem.status.unwrap());
		assert_eq!(
			ContributionProjectionRepositoryError::Infrastructure(Box::new(Error)).to_string(),
			problem.title.unwrap()
		);
		assert_eq!(Error.to_string(), problem.detail.unwrap());
	}
}
