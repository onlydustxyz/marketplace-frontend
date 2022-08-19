use deathnote_contributions_feeder::application::ValidateContributionUsecase;
use http_api_problem::HttpApiProblem;
use rocket::{response::status, State};
use rocket_okapi::openapi;
use uuid::Uuid;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem, uuid::UuidParam};

#[openapi(tag = "Contributions")]
#[post("/contributions/<contribution_id>/validate")]
pub async fn validate_contribution(
	_api_key: ApiKey,
	contribution_id: UuidParam,
	usecase: &State<Box<dyn ValidateContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contribution_id = Uuid::from(contribution_id).into();
	usecase
		.send_validate_request(&contribution_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use super::*;
	use deathnote_contributions_feeder::{application::MockValidateContribution, domain::*};
	use http_api_problem::StatusCode;
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
			.with(eq(ContributionId::from(Uuid::from_u128(12))))
			.returning(|_| Ok(()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			Uuid::from_u128(12).into(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn validate_should_return_500_upon_failure() {
		let mut usecase = MockValidateContribution::new();

		usecase.expect_send_validate_request().returning(|_| {
			Err(ContributionRepositoryError::Infrastructure(Box::new(Error)).into())
		});

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			Uuid::from_u128(12).into(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::INTERNAL_SERVER_ERROR, problem.status.unwrap());
		assert_eq!(
			ContributionRepositoryError::Infrastructure(Box::new(Error)).to_string(),
			problem.title.unwrap()
		);
		assert_eq!(Error.to_string(), problem.detail.unwrap());
	}
}
