use deathnote_contributions_feeder::{
	application::AssignContributionUsecase, domain::ContributionId,
};
use http_api_problem::HttpApiProblem;
use log::info;
use rocket::{
	response::status,
	serde::{json::Json, uuid::Uuid, Deserialize},
	State,
};
use rocket_okapi::{openapi, JsonSchema};

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct AssignContributorDto {
	contributor_id: u128,
}

#[openapi(tag = "Contributions")]
#[post(
	"/contributions/<contribution_id>/contributor",
	format = "application/json",
	data = "<body>"
)]
pub async fn assign_contributor(
	_api_key: ApiKey,
	contribution_id: Uuid,
	body: Json<AssignContributorDto>,
	usecase: &State<Box<dyn AssignContributionUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let body = body.into_inner();
	info!("contributor_id={}", body.contributor_id);

	usecase
		.send_assign_request(
			ContributionId::from_u128_le(contribution_id.to_u128_le()),
			body.contributor_id.into(),
		)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}

#[cfg(test)]
mod test {
	use super::*;
	use deathnote_contributions_feeder::{application::MockAssignContribution, domain::*};
	use http_api_problem::StatusCode;
	use mockall::predicate::*;

	#[tokio::test]
	async fn assign_should_return_accepted_upon_success() {
		let mut usecase = MockAssignContribution::new();

		usecase
			.expect_send_assign_request()
			.with(
				eq(ContributionId::from_u128(12)),
				eq(ContributorId::from(34)),
			)
			.returning(|_, _| Ok(()));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn AssignContributionUsecase>);

		let result = assign_contributor(
			ApiKey::default(),
			Uuid::from_u128(12),
			AssignContributorDto { contributor_id: 34 }.into(),
			State::get(&rocket).unwrap(),
		)
		.await;

		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		assert_eq!(status::Accepted(None), result.unwrap());
	}

	#[tokio::test]
	async fn assign_should_return_500_upon_failure() {
		let mut usecase = MockAssignContribution::new();

		usecase
			.expect_send_assign_request()
			.returning(|_, _| Err(Error::InvalidContribution(String::from("Oops"))));

		let rocket =
			rocket::build().manage(Box::new(usecase) as Box<dyn AssignContributionUsecase>);

		let result = assign_contributor(
			ApiKey::default(),
			Uuid::from_u128(12),
			AssignContributorDto { contributor_id: 34 }.into(),
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
