use std::{collections::HashMap, str::FromStr, sync::RwLock};

use super::*;
use marketplace_domain::{Error as DomainError, *};
use rocket::{
	http::{ContentType, Status},
	local::blocking::Client,
	Build,
};
use serde_json::json;
use thiserror::Error;

const CONTRIBUTION_ID_1: &str = "0x1234";

#[derive(Debug, Error)]
#[error("Already in DB")]
struct AlreadyExist;

#[derive(Debug, Error)]
#[error("No contribution with id {0}")]
struct ContributionNotFound(ContributionId);

struct ApplyToContribution(
	RwLock<HashMap<ContributionId, HashMap<ContributorAccountAddress, bool>>>,
);

#[async_trait]
impl ApplyToContributionUsecase for ApplyToContribution {
	async fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), DomainError> {
		let mut lock = self.0.write().unwrap();
		let contribution_db = lock.get_mut(contribution_id).ok_or_else(|| {
			DomainError::ApplicationProjectionRepository(
				ApplicationProjectionRepositoryError::InvalidEntity(Box::new(
					ContributionNotFound(contribution_id.to_owned()),
				)),
			)
		})?;

		let already_applied =
			contribution_db.get(contributor_account_address).copied().unwrap_or_default();

		if already_applied {
			return Err(DomainError::ApplicationProjectionRepository(
				ApplicationProjectionRepositoryError::AlreadyExist(Box::new(AlreadyExist)),
			));
		}
		contribution_db.insert(contributor_account_address.to_owned(), true);

		Ok(())
	}
}

fn rocket() -> rocket::Rocket<Build> {
	let contribution_id_1 = ContributionId::from_str(CONTRIBUTION_ID_1).unwrap();
	let mut database = HashMap::new();
	database.insert(contribution_id_1, HashMap::new());

	rocket::build()
		.mount("/", routes![apply_to_contribution])
		.manage(Box::new(ApplyToContribution(RwLock::new(database)))
			as Box<dyn ApplyToContributionUsecase>)
}

#[test]
fn should_return_200_when_ok() {
	let api_url = "0.0.0.0:8000";
	let uri = format!("/contributions/{CONTRIBUTION_ID_1}/applications");
	let contributor_account_address =
		"0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_account_address": contributor_account_address }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri.clone()).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::Created);
	assert_ne!(
		format!("{api_url}/{uri}/{contributor_account_address}"),
		response.headers().get_one("Location").unwrap()
	);
}

#[test]
fn should_return_409_if_already_exist() {
	let api_url = "0.0.0.0:8000";
	let uri = format!("/contributions/{CONTRIBUTION_ID_1}/applications");
	let contributor_account_address =
		"0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_account_address": contributor_account_address }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri.clone()).header(ContentType::JSON).body(body.clone()).dispatch();
	assert_eq!(response.status(), Status::Created);

	let response = client.post(uri).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::Conflict);
	let http_api_problem_response = response.into_json::<HttpApiProblem>().unwrap();
	assert_eq!(
		http_api_problem_response.title,
		Some(
			ApplicationProjectionRepositoryError::AlreadyExist(Box::new(AlreadyExist)).to_string()
		)
	);
	assert_eq!(
		http_api_problem_response.detail,
		Some(AlreadyExist.to_string())
	);
}

#[test]
fn should_return_400_if_invalid_parameters() {
	let contribution_id_2 = "0x123456";
	let api_url = "0.0.0.0:8000";
	let uri = format!("/contributions/{contribution_id_2}/applications");
	let contributor_account_address =
		"0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_account_address": contributor_account_address }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::BadRequest);
	let http_api_problem_response = response.into_json::<HttpApiProblem>().unwrap();
	assert_eq!(
		http_api_problem_response.title,
		Some(
			ApplicationProjectionRepositoryError::InvalidEntity(Box::new(ContributionNotFound(
				contribution_id_2.parse().unwrap()
			)))
			.to_string()
		)
	);
	assert_eq!(
		http_api_problem_response.detail,
		Some(ContributionNotFound(contribution_id_2.parse().unwrap()).to_string())
	);
}
