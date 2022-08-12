use assert_matches::assert_matches;
use uuid::Uuid;

use crate::{
	domain::*,
	infrastructure::database::{init_pool, Client},
};

use super::init_contribution;

#[test]
#[ignore = "require a database"]
fn store_and_find() {
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

	<Client as ApplicationRepository>::store(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::store(&client, application2.clone()).unwrap();

	let found_application =
		<Client as ApplicationRepository>::find(&client, application1.id()).unwrap();
	assert_eq!(found_application, Some(application1));

	let found_application =
		<Client as ApplicationRepository>::find(&client, application2.id()).unwrap();
	assert_eq!(found_application, Some(application2));

	let found_application =
		<Client as ApplicationRepository>::find(&client, &Uuid::new_v4().into()).unwrap();
	assert_eq!(found_application, None);
}

#[test]
#[ignore = "require a database"]
fn id_must_be_unique() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let id = Uuid::new_v4().into();

	let application1 = Application::new(id, contribution.id, 0.into(), ApplicationStatus::Pending);
	let application2 = Application::new(id, contribution.id, 1.into(), ApplicationStatus::Pending);

	<Client as ApplicationRepository>::store(&client, application1).unwrap();
	let res = <Client as ApplicationRepository>::store(&client, application2);

	assert!(res.is_err());
	assert_matches!(
		res.unwrap_err(),
		ApplicationRepositoryError::AlreadyExist(_)
	);
}

#[test]
#[ignore = "require a database"]
fn find_return_none_if_not_found() {
	let client = Client::new(init_pool());

	let res = <Client as ApplicationRepository>::find(&client, &Uuid::new_v4().into());
	assert!(res.is_ok());
	assert_eq!(res.unwrap(), None)
}

#[test]
#[ignore = "require a database"]
fn cannot_apply_twice() {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application = Application::new(
		Uuid::new_v4().into(),
		contribution.id,
		0.into(),
		ApplicationStatus::Pending,
	);

	<Client as ApplicationRepository>::store(&client, application.clone()).unwrap();
	let res = <Client as ApplicationRepository>::store(&client, application);

	assert!(res.is_err());
	assert_matches!(
		res.unwrap_err(),
		ApplicationRepositoryError::AlreadyExist(_)
	);
}

#[test]
#[ignore = "require a database"]
fn contribution_id_must_exist() {
	let client = Client::new(init_pool());

	let application = Application::new(
		Uuid::new_v4().into(),
		Uuid::new_v4().into(),
		0.into(),
		ApplicationStatus::Pending,
	);

	let res = <Client as ApplicationRepository>::store(&client, application);

	assert!(res.is_err());
	assert_matches!(
		res.unwrap_err(),
		ApplicationRepositoryError::InvalidEntity(_)
	);
}

#[test]
#[ignore = "require a database"]
fn store_multiple_and_list() {
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

	<Client as ApplicationRepository>::store(&client, application1.clone()).unwrap();
	<Client as ApplicationRepository>::store(&client, application2.clone()).unwrap();

	let applications =
		<Client as ApplicationRepository>::list_by_contribution(&client, &contribution.id, None)
			.unwrap();

	assert_eq!(
		applications,
		vec![application1.clone(), application2.clone()]
	);

	let applications = <Client as ApplicationRepository>::list_by_contribution(
		&client,
		&contribution.id,
		Some(*application1.contributor_id()),
	)
	.unwrap();

	assert_eq!(applications, vec![application1]);

	let applications = <Client as ApplicationRepository>::list_by_contribution(
		&client,
		&contribution.id,
		Some(*application2.contributor_id()),
	)
	.unwrap();

	assert_eq!(applications, vec![application2])
}
