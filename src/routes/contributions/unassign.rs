use deathnote_contributions_feeder::application::UnassignContributionUsecase;
use http_api_problem::HttpApiProblem;
use rocket::{response::status, State};
use rocket_okapi::openapi;
use uuid::Uuid;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem, uuid::UuidParam};

#[openapi(tag = "Contributions")]
#[delete("/contributions/<contribution_id>/contributor")]
pub async fn unassign_contributor(
	_api_key: ApiKey,

	contribution_id: UuidParam,
	usecase: &State<Box<dyn UnassignContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contribution_id = Uuid::from(contribution_id).into();
	usecase
		.send_unassign_request(contribution_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use super::*;
	use deathnote_contributions_feeder::{application::MockUnassignContribution, domain::*};
	use http_api_problem::StatusCode;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[tokio::test]
	async fn unassign_should_return_accepted_upon_success() {
		let mut usecase = MockUnassignContribution::new();

		usecase
			.expect_send_unassign_request()
			.with(eq(ContributionId::from(Uuid::from_u128(12))))
			.returning(|_| Ok(()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn UnassignContributionUsecase>);

		let result = unassign_contributor(
			ApiKey::default(),
			Uuid::from_u128(12).into(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn unassign_should_return_500_upon_failure() {
		let mut usecase = MockUnassignContribution::new();

		usecase.expect_send_unassign_request().returning(|_| {
			Err(ContributionRepositoryError::Infrastructure(Box::new(Error)).into())
		});

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn UnassignContributionUsecase>);

		let result = unassign_contributor(
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
