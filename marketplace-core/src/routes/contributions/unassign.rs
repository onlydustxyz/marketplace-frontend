use http_api_problem::HttpApiProblem;
use marketplace_core::application::UnassignContributionUsecase;
use marketplace_domain::ParseHexPrefixedStringError;
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};

#[openapi(tag = "Contributions")]
#[delete("/contributions/<contribution_id>/contributor")]
pub async fn unassign_contributor(
	_api_key: ApiKey,

	contribution_id: String,
	usecase: &State<Box<dyn UnassignContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contribution_id = contribution_id
		.parse()
		.map_err(|e: ParseHexPrefixedStringError| e.to_http_api_problem())?;

	usecase
		.send_unassign_request(&contribution_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use http_api_problem::StatusCode;
	use marketplace_core::application::MockUnassignContribution;
	use marketplace_domain::*;

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
			.with(eq(ContributionId::from_str("0x12").unwrap()))
			.returning(|_| Ok((HexPrefixedString::default())));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn UnassignContributionUsecase>);

		let result = unassign_contributor(
			ApiKey::default(),
			"0x12".into(),
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
			"0x12".into(),
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
