use std::sync::Arc;

use super::list_contributor_applications;

use deathnote_contributions_feeder::domain::{
	Application, ApplicationRepository, ApplicationStatus, ContributionId, ContributorId,
};
use rocket::{http::Status, local::blocking::Client, Build};
use uuid::Uuid;

const CONTRIBUTOR_ID_0: &str = "0x0000000000000000000000000000000000000000000000000000000000000000";
const CONTRIBUTOR_ID_1: &str = "0x0000000000000000000000000000000000000000000000000000000000000911";
const CONTRIBUTOR_ID_2: &str = "0x0000000000000000000000000000000000000000000000000000000000000666";
struct EmptyDatabase;
impl ApplicationRepository for EmptyDatabase {
	fn store(
		&self,
		_application: deathnote_contributions_feeder::domain::Application,
	) -> Result<(), deathnote_contributions_feeder::domain::ApplicationRepositoryError> {
		unimplemented!()
	}

	fn find(
		&self,
		_id: &deathnote_contributions_feeder::domain::ApplicationId,
	) -> Result<
		Option<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		unimplemented!()
	}

	fn list_by_contribution(
		&self,
		_contribution_id: &ContributionId,
		_contributor_id: Option<&ContributorId>,
	) -> Result<
		Vec<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		unimplemented!()
	}

	fn list_by_contributor(
		&self,
		_contributor_id: &ContributorId,
	) -> Result<
		Vec<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		Ok(vec![])
	}
}
struct FilledDatabase;
impl ApplicationRepository for FilledDatabase {
	fn store(
		&self,
		_application: deathnote_contributions_feeder::domain::Application,
	) -> Result<(), deathnote_contributions_feeder::domain::ApplicationRepositoryError> {
		unimplemented!()
	}

	fn find(
		&self,
		_id: &deathnote_contributions_feeder::domain::ApplicationId,
	) -> Result<
		Option<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		unimplemented!()
	}

	fn list_by_contribution(
		&self,
		_contribution_id: &ContributionId,
		_contributor_id: Option<&ContributorId>,
	) -> Result<
		Vec<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		unimplemented!()
	}

	fn list_by_contributor(
		&self,
		contributor_id: &ContributorId,
	) -> Result<
		Vec<deathnote_contributions_feeder::domain::Application>,
		deathnote_contributions_feeder::domain::ApplicationRepositoryError,
	> {
		let contributor = format!("0x{}", contributor_id);
		match contributor.as_str() {
			CONTRIBUTOR_ID_1 => Ok(vec![
				Application::new(
					Uuid::from_u128(2).into(),
					Uuid::from_u128(0).into(),
					911u128.into(),
					ApplicationStatus::Pending,
				),
				Application::new(
					Uuid::from_u128(3).into(),
					Uuid::from_u128(1).into(),
					911u128.into(),
					ApplicationStatus::Pending,
				),
			]),
			CONTRIBUTOR_ID_0 => Ok(vec![
				Application::new(
					Uuid::from_u128(0).into(),
					Uuid::from_u128(0).into(),
					0u128.into(),
					ApplicationStatus::Pending,
				),
				Application::new(
					Uuid::from_u128(1).into(),
					Uuid::from_u128(0).into(),
					0u128.into(),
					ApplicationStatus::Pending,
				),
			]),
			_ => Ok(vec![]),
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
		Vec::<Application>::new(),
		response.into_json::<Vec<Application>>().unwrap()
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
			Application::new(
				Uuid::from_u128(2).into(),
				Uuid::from_u128(0).into(),
				911u128.into(),
				ApplicationStatus::Pending,
			),
			Application::new(
				Uuid::from_u128(3).into(),
				Uuid::from_u128(1).into(),
				911u128.into(),
				ApplicationStatus::Pending,
			)
		],
		response.into_json::<Vec<Application>>().unwrap()
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
		Vec::<Application>::new(),
		response.into_json::<Vec<Application>>().unwrap()
	);
}
