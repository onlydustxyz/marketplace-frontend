use std::{str::FromStr, sync::Arc};

use super::list_contributor_applications;

use crypto_bigint::U256;
use marketplace_core::dto;
use marketplace_domain::*;
use rocket::{http::Status, local::blocking::Client, Build};
use uuid::Uuid;

const CONTRIBUTOR_ID_0: &str = "0x0000000000000000000000000000000000000000000000000000000000000000";
const CONTRIBUTOR_ID_1: &str = "0x0000000000000000000000000000000000000000000000000000000000000911";
const CONTRIBUTOR_ID_2: &str = "0x0000000000000000000000000000000000000000000000000000000000000666";
struct EmptyDatabase;
impl ApplicationRepository for EmptyDatabase {
	fn create(&self, _application: Application) -> Result<(), ApplicationRepositoryError> {
		unimplemented!()
	}

	fn update(&self, _application: Application) -> Result<(), ApplicationRepositoryError> {
		unimplemented!()
	}

	fn find(&self, _id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		unimplemented!()
	}

	fn list_by_contribution(
		&self,
		_contribution_id: &ContributionId,
		_contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		unimplemented!()
	}

	fn list_by_contributor(
		&self,
		_contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		Ok(vec![])
	}
}
struct FilledDatabase;
impl ApplicationRepository for FilledDatabase {
	fn create(&self, _application: Application) -> Result<(), ApplicationRepositoryError> {
		unimplemented!()
	}

	fn update(&self, _application: Application) -> Result<(), ApplicationRepositoryError> {
		unimplemented!()
	}

	fn find(&self, _id: &ApplicationId) -> Result<Option<Application>, ApplicationRepositoryError> {
		unimplemented!()
	}

	fn list_by_contribution(
		&self,
		_contribution_id: &ContributionId,
		_contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		unimplemented!()
	}

	fn list_by_contributor(
		&self,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<Application>, ApplicationRepositoryError> {
		match contributor_id {
			Some(contributor_id) => match contributor_id.to_string().as_str() {
				CONTRIBUTOR_ID_1 => Ok(vec![
					Application::new(
						Uuid::from_u128(2).into(),
						Uuid::from_u128(0).into(),
						contributor_id.clone(),
						ApplicationStatus::Pending,
					),
					Application::new(
						Uuid::from_u128(3).into(),
						Uuid::from_u128(1).into(),
						contributor_id.clone(),
						ApplicationStatus::Pending,
					),
				]),
				CONTRIBUTOR_ID_0 => Ok(vec![
					Application::new(
						Uuid::from_u128(0).into(),
						Uuid::from_u128(0).into(),
						contributor_id.clone(),
						ApplicationStatus::Pending,
					),
					Application::new(
						Uuid::from_u128(1).into(),
						Uuid::from_u128(0).into(),
						contributor_id,
						ApplicationStatus::Pending,
					),
				]),
				_ => Ok(vec![]),
			},
			None => Ok(vec![
				Application::new(
					Uuid::from_u128(2).into(),
					Uuid::from_u128(0).into(),
					ContributorId::from_str(CONTRIBUTOR_ID_1).unwrap(),
					ApplicationStatus::Pending,
				),
				Application::new(
					Uuid::from_u128(3).into(),
					Uuid::from_u128(1).into(),
					ContributorId::from_str(CONTRIBUTOR_ID_1).unwrap(),
					ApplicationStatus::Pending,
				),
				Application::new(
					Uuid::from_u128(0).into(),
					Uuid::from_u128(0).into(),
					ContributorId::from_str(CONTRIBUTOR_ID_0).unwrap(),
					ApplicationStatus::Pending,
				),
				Application::new(
					Uuid::from_u128(1).into(),
					Uuid::from_u128(0).into(),
					ContributorId::from_str(CONTRIBUTOR_ID_0).unwrap(),
					ApplicationStatus::Pending,
				),
			]),
		}
	}
}

fn rocket() -> rocket::Rocket<Build> {
	rocket::build().mount("/", routes![list_contributor_applications])
}

#[test]
fn ok_empty() {
	let uri = format!("/applications?contributor_id={CONTRIBUTOR_ID_1}");
	let client = Client::untracked(
		rocket().manage(Arc::new(EmptyDatabase) as Arc<dyn ApplicationRepository>),
	)
	.expect("valid rocket instance");
	let response = client.get(uri).dispatch();

	assert_eq!(response.status(), Status::Ok);
	assert_eq!(
		Vec::<dto::Application>::new(),
		response.into_json::<Vec<dto::Application>>().unwrap()
	);
}

#[test]
fn ok_multiple() {
	let uri = format!("/applications?contributor_id={CONTRIBUTOR_ID_1}");
	let client = Client::untracked(
		rocket().manage(Arc::new(FilledDatabase) as Arc<dyn ApplicationRepository>),
	)
	.expect("valid rocket instance");
	let response = client.get(uri).dispatch();

	assert_eq!(response.status(), Status::Ok);
	assert_eq!(
		vec![
			dto::Application {
				id: Uuid::from_u128(2).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(3).to_string(),
				contribution_id: Uuid::from_u128(1).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			}
		],
		response.into_json::<Vec<dto::Application>>().unwrap()
	);
}

#[test]
fn ok_no_application_from_contributor() {
	let uri = format!("/applications?contributor_id={CONTRIBUTOR_ID_2}");
	let client = Client::untracked(
		rocket().manage(Arc::new(FilledDatabase) as Arc<dyn ApplicationRepository>),
	)
	.expect("valid rocket instance");
	let response = client.get(uri).dispatch();

	assert_eq!(response.status(), Status::Ok);
	assert_eq!(
		Vec::<dto::Application>::new(),
		response.into_json::<Vec<dto::Application>>().unwrap()
	);
}

#[test]
fn ok_no_contributor_given() {
	let uri = "/applications";
	let client = Client::untracked(
		rocket().manage(Arc::new(FilledDatabase) as Arc<dyn ApplicationRepository>),
	)
	.expect("valid rocket instance");
	let response = client.get(uri).dispatch();

	assert_eq!(response.status(), Status::Ok);
	assert_eq!(
		vec![
			dto::Application {
				id: Uuid::from_u128(2).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(3).to_string(),
				contribution_id: Uuid::from_u128(1).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(0).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(1).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
		],
		response.into_json::<Vec<dto::Application>>().unwrap()
	);
}

#[test]
fn ok_empty_contributor_given() {
	let uri = "/applications?contributor_id=";
	let client = Client::untracked(
		rocket().manage(Arc::new(FilledDatabase) as Arc<dyn ApplicationRepository>),
	)
	.expect("valid rocket instance");
	let response = client.get(uri).dispatch();

	assert_eq!(response.status(), Status::Ok);
	assert_eq!(
		vec![
			dto::Application {
				id: Uuid::from_u128(2).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(3).to_string(),
				contribution_id: Uuid::from_u128(1).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0x911)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(0).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
			dto::Application {
				id: Uuid::from_u128(1).to_string(),
				contribution_id: Uuid::from_u128(0).to_string(),
				contributor_id: ContributorId::from(U256::from_u128(0)).to_string(),
				status: ApplicationStatus::Pending.to_string(),
			},
		],
		response.into_json::<Vec<dto::Application>>().unwrap()
	);
}
