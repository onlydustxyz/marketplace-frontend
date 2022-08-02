use super::dto;
use deathnote_contributions_feeder::application::GetContributorUsecase;
use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::{get, serde::json::Json, State};
use rocket_okapi::openapi;
use std::{error::Error, result::Result};

#[openapi(tag = "Contributors")]
#[get("/contributors/<contributor_id>")]
pub fn find_by_id(
	usecase: &State<Box<dyn GetContributorUsecase>>,
	contributor_id: u128,
) -> Result<Json<dto::Contributor>, HttpApiProblem> {
	let contributor = usecase.find_by_id(contributor_id.into()).map_err(|error| {
		let mut problem = HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Error while fetching contributor");
		if let Some(s) = error.source() {
			problem.detail = Some(s.to_string());
		}
		problem
	})?;

	match contributor {
		Some(contributor) => Ok(Json(contributor.into())),
		None => Err(HttpApiProblem::new(StatusCode::NOT_FOUND).title("Contributor not found")),
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use deathnote_contributions_feeder::{application::MockGetContributor, domain::*};
	use mockall::predicate::*;
	use thiserror::Error;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[test]
	fn find_by_id_should_return_404_when_contributor_not_found() {
		let mut usecase = MockGetContributor::new();
		usecase
			.expect_find_by_id()
			.with(eq(ContributorId::from(123)))
			.returning(|_| Ok(None));

		let rocket = rocket::build().manage(Box::new(usecase) as Box<dyn GetContributorUsecase>);

		let result = find_by_id(State::get(&rocket).unwrap(), 123);
		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::NOT_FOUND, problem.status.unwrap());
		assert_eq!("Contributor not found", problem.title.as_ref().unwrap());
	}

	#[test]
	fn find_by_id_should_forward_error_as_500() {
		let mut usecase = MockGetContributor::new();

		usecase
			.expect_find_by_id()
			.with(eq(ContributorId::from(123)))
			.returning(|_| Err(ContributorRepositoryError::Infrastructure(Box::new(Error)).into()));

		let rocket = rocket::build().manage(Box::new(usecase) as Box<dyn GetContributorUsecase>);

		let result = find_by_id(State::get(&rocket).unwrap(), 123);
		assert!(result.is_err());

		let problem = result.err().unwrap();
		assert_eq!(StatusCode::INTERNAL_SERVER_ERROR, problem.status.unwrap());
		assert_eq!(
			"Error while fetching contributor",
			problem.title.as_ref().unwrap()
		);
		assert_eq!(
			"Something happend at the infrastructure level",
			problem.detail.as_ref().unwrap()
		);
	}

	#[test]
	fn find_by_id_should_return_contributor_if_found() {
		let mut usecase = MockGetContributor::new();

		usecase.expect_find_by_id().with(eq(ContributorId::from(123))).returning(|_| {
			Ok(Some(Contributor {
				id: ContributorId::from(123),
				github_username: None,
				github_handle: Some(String::from("github")),
				discord_handle: Some(String::from("discord")),
			}))
		});

		let rocket = rocket::build().manage(Box::new(usecase) as Box<dyn GetContributorUsecase>);
		let result = find_by_id(State::get(&rocket).unwrap(), 123);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());

		let contributor = result.unwrap();
		assert_eq!(123, contributor.contributor_id);
		assert_eq!(Some(String::from("github")), contributor.github_userid);
		assert_eq!(Some(String::from("discord")), contributor.discord_handle);
	}
}
