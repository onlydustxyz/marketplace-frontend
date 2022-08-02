use deathnote_contributions_feeder::{
	application::ValidateContributionUsecase, domain::ContributionId,
};
use http_api_problem::HttpApiProblem;
use rocket::{
	response::status,
	serde::{json::Json, uuid::Uuid},
	State,
};
use rocket_okapi::openapi;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};

#[openapi(tag = "Contributions")]
#[post("/contributions/<contribution_id>/validate")]
pub async fn validate_contribution(
	_api_key: ApiKey,
	contribution_id: Uuid,
	usecase: &State<Box<dyn ValidateContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	usecase
		.send_validate_request(ContributionId::from_u128_le(contribution_id.to_u128_le()))
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use super::*;
	use deathnote_contributions_feeder::{application::MockValidateContribution, domain::*};
	use http_api_problem::StatusCode;
	use mockall::predicate::*;

	#[tokio::test]
	async fn validate_should_return_accepted_upon_success() {
		let mut usecase = MockValidateContribution::new();

		usecase
			.expect_send_validate_request()
			.with(eq(ContributionId::from_u128(12)))
			.returning(|_| Ok(()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			Uuid::from_u128(12),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn validate_should_return_500_upon_failure() {
		let mut usecase = MockValidateContribution::new();

		usecase
			.expect_send_validate_request()
			.returning(|_| Err(Error::InvalidContribution(String::from("Oops"))));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn ValidateContributionUsecase>);

		let result = validate_contribution(
			ApiKey::default(),
			Uuid::from_u128(12),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::BAD_REQUEST, problem.status.unwrap());
		assert_eq!("Invalid contribution", problem.title.as_ref().unwrap());
		assert_eq!("Oops", problem.detail.as_ref().unwrap());
	}
}
