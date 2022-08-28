use marketplace_domain::*;
use uuid::Uuid;

use crate::database::{init_pool, Client};

use super::init_contribution;

#[test]
#[ignore = "require a database"]
fn accept_application_ok() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = Application::new(Uuid::new_v4().into(), contribution.id.clone(), 0.into());
	let application2 = Application::new(Uuid::new_v4().into(), contribution.id.clone(), 1.into());
	let application3 = Application::new(Uuid::new_v4().into(), contribution.id, 3.into());

	<Client as ApplicationRepository>::create(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application2.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application3.clone()).unwrap();

	<Client as ApplicationService>::accept_application(&client, application1.to_owned()).unwrap();

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
fn reject_all_applications_ok() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = Application::new(Uuid::new_v4().into(), contribution.id.clone(), 0.into());
	let application2 = Application::new(Uuid::new_v4().into(), contribution.id.clone(), 1.into());
	let application3 = Application::new(Uuid::new_v4().into(), contribution.id.clone(), 3.into());

	<Client as ApplicationRepository>::create(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application2.clone()).unwrap();
	<Client as ApplicationRepository>::create(&client, application3.clone()).unwrap();

	<Client as ApplicationService>::reject_all_applications(&client, &contribution.id).unwrap();

	assert_eq!(
		<Client as ApplicationRepository>::find(&client, application1.id())
			.unwrap()
			.unwrap()
			.status(),
		&ApplicationStatus::Refused
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
