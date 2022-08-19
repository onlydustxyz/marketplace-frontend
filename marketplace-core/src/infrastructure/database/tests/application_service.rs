use assert_matches::assert_matches;
use marketplace_domain::*;
use uuid::Uuid;

use crate::infrastructure::database::{init_pool, Client};

use super::init_contribution;

#[test]
#[ignore = "require a database"]
fn accept_application_ok() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		0.into(),
		ApplicationStatus::Pending,
	);
	let application2 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		1.into(),
		ApplicationStatus::Pending,
	);
	let application3 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		3.into(),
		ApplicationStatus::Pending,
	);

	<Client as ApplicationRepository>::create(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application2.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application3.clone()).unwrap();

	<Client as ApplicationService>::accept_application(&client, application1.id()).unwrap();

	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application1.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Accepted
	);
	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application2.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Refused
	);
	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application3.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Refused
	);
}

#[test]
#[ignore = "require a database"]
fn cannot_accept_invalid_status() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		0.into(),
		ApplicationStatus::Pending,
	);
	let application2 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		1.into(),
		ApplicationStatus::Pending,
	);
	let application3 = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		3.into(),
		ApplicationStatus::Pending,
	);

	<Client as ApplicationRepository>::create(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application2.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application3.clone()).unwrap();

	<Client as ApplicationService>::accept_application(&client, application1.id()).unwrap();

	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application1.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Accepted
	);
	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application2.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Refused
	);
	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application3.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Refused
	);

	assert_matches!(
		<Client as ApplicationService>::accept_application(&client, application2.id()),
		Err(ApplicationServiceError::InvalidApplicationStatus {
			current: ApplicationStatus::Refused,
			required: ApplicationStatus::Pending
		})
	);

	assert_matches!(
		<Client as ApplicationService>::accept_application(&client, application1.id()),
		Err(ApplicationServiceError::InvalidApplicationStatus {
			current: ApplicationStatus::Accepted,
			required: ApplicationStatus::Pending
		})
	);
}

#[test]
#[ignore = "require a database"]
fn id_must_exist() {
	let client = Client::new(init_pool());

	let res = <Client as ApplicationService>::accept_application(&client, &Uuid::new_v4().into());
	assert_matches!(res, Err(ApplicationServiceError::NotFound))
}
