use std::{collections::HashMap, str::FromStr, sync::RwLock};

use super::*;
use onlydust_domain::{Error as DomainError, *};
use rocket::{
	http::{ContentType, Status},
	local::blocking::Client,
	Build,
};
use serde_json::json;
use thiserror::Error;
use uuid::Uuid;

const CONTRIBUTION_ID_1: &str = "a6127643-1344-4a44-bbfb-7142c17a4ef0";

#[derive(Debug, Error)]
#[error("Already in DB")]
struct AlreadyExist;

#[derive(Debug, Error)]
#[error("No contribution with id {0}")]
struct ContributionNotFound(ContributionId);

struct ApplyToContribution(RwLock<HashMap<ContributionId, HashMap<ContributorId, bool>>>);

impl ApplyToContributionUsecase for ApplyToContribution {
	fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let mut lock = self.0.write().unwrap();
		let contribution_db = lock.get_mut(contribution_id).ok_or_else(|| {
			DomainError::ApplicationRepository(ApplicationRepositoryError::InvalidEntity(Box::new(
				ContributionNotFound(*contribution_id),
			)))
		})?;

		let already_applied = contribution_db.get(contributor_id).copied().unwrap_or_default();

		if already_applied {
			return Err(DomainError::ApplicationRepository(
				ApplicationRepositoryError::AlreadyExist(Box::new(AlreadyExist)),
			));
		}
		contribution_db.insert(*contributor_id, true);

		Ok(())
	}
}

fn rocket() -> rocket::Rocket<Build> {
	let contribution_id_1: ContributionId = Uuid::from_str(CONTRIBUTION_ID_1).unwrap().into();
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
	let contributor_id = "0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_id": contributor_id }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri.clone()).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::Created);
	assert_ne!(
		format!("{api_url}/{uri}/{contributor_id}"),
		response.headers().get_one("Location").unwrap()
	);
}

#[test]
fn should_return_409_if_already_exist() {
	let api_url = "0.0.0.0:8000";
	let uri = format!("/contributions/{CONTRIBUTION_ID_1}/applications");
	let contributor_id = "0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_id": contributor_id }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri.clone()).header(ContentType::JSON).body(body.clone()).dispatch();
	assert_eq!(response.status(), Status::Created);

	let response = client.post(uri).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::Conflict);
	let http_api_problem_response = response.into_json::<HttpApiProblem>().unwrap();
	assert_eq!(
		http_api_problem_response.title,
		Some(ApplicationRepositoryError::AlreadyExist(Box::new(AlreadyExist)).to_string())
	);
	assert_eq!(
		http_api_problem_response.detail,
		Some(AlreadyExist.to_string())
	);
}

#[test]
fn should_return_400_if_invalid_parameters() {
	let contribution_id_2 = "b6127643-1344-4a44-bbfb-7142c17a4ef0";
	let contribution_uuid = Uuid::from_str(contribution_id_2).unwrap();
	let api_url = "0.0.0.0:8000";
	let uri = format!("/contributions/{contribution_id_2}/applications");
	let contributor_id = "0x0000000000000000000000000000000000000000000000000000000000000000";
	std::env::set_var("API_URL", api_url);

	let body = json!({ "contributor_id": contributor_id }).to_string();

	let client = Client::untracked(rocket()).expect("valid rocket instance");
	let response = client.post(uri).header(ContentType::JSON).body(body).dispatch();
	assert_eq!(response.status(), Status::BadRequest);
	let http_api_problem_response = response.into_json::<HttpApiProblem>().unwrap();
	assert_eq!(
		http_api_problem_response.title,
		Some(
			ApplicationRepositoryError::InvalidEntity(Box::new(ContributionNotFound(
				contribution_uuid.into()
			)))
			.to_string()
		)
	);
	assert_eq!(
		http_api_problem_response.detail,
		Some(ContributionNotFound(contribution_uuid.into()).to_string())
	);
}
