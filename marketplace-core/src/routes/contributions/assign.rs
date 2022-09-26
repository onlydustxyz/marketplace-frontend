use http_api_problem::HttpApiProblem;
use marketplace_core::application::AssignContributionUsecase;
use rocket::{
	response::status,
	serde::{json::Json, Deserialize},
	State,
};
use rocket_okapi::{openapi, JsonSchema};

use crate::routes::{
	api_key::ApiKey, hex_prefixed_string::HexPrefixedStringDto,
	to_http_api_problem::ToHttpApiProblem, u256::U256Param,
};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct AssignContributorDto {
	contributor_id: U256Param,
}

#[openapi(tag = "Contributions")]
#[post(
	"/contributions/<contribution_id>/contributor",
	format = "application/json",
	data = "<body>"
)]
#[deprecated(since = "0.1.0", note = "please use `accept_application` instead")]
pub async fn assign_contributor(
	_api_key: ApiKey,
	contribution_id: HexPrefixedStringDto,
	body: Json<AssignContributorDto>,
	usecase: &State<Box<dyn AssignContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contributor_id = body.into_inner().contributor_id.into();
	let contribution_id = contribution_id.into();

	usecase
		.send_assign_request(&contribution_id, &contributor_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use crypto_bigint::U256;
	use http_api_problem::StatusCode;
	use marketplace_core::application::MockAssignContribution;
	use marketplace_domain::*;
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[tokio::test]
	async fn assign_should_return_accepted_upon_success() {
		let mut usecase = MockAssignContribution::new();

		usecase
			.expect_send_assign_request()
			.with(
				eq(ContributionId::from_str("0x12").unwrap()),
				eq(ContributorId::from(34)),
			)
			.returning(|_, _| Ok(HexPrefixedString::default()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn AssignContributionUsecase>);

		let result = assign_contributor(
			ApiKey::default(),
			HexPrefixedStringDto::from_str("0x12").unwrap(),
			AssignContributorDto {
				contributor_id: U256::from_u128(34).into(),
			}
			.into(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn assign_should_return_500_upon_failure() {
		let mut usecase = MockAssignContribution::new();

		usecase.expect_send_assign_request().returning(|_, _| {
			Err(ContributionProjectionRepositoryError::Infrastructure(Box::new(Error)).into())
		});

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn AssignContributionUsecase>);

		let result = assign_contributor(
			ApiKey::default(),
			HexPrefixedStringDto::from_str("0x12").unwrap(),
			AssignContributorDto {
				contributor_id: U256::from_u128(34).into(),
			}
			.into(),
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
