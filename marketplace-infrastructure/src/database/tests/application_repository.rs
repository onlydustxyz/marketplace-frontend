use crate::database::{
	init_pool,
	tests::{init_contribution_with_id, init_project},
	Client,
};
use assert_matches::assert_matches;
use chrono::{NaiveDate, NaiveDateTime};
use marketplace_domain::*;
use rstest::{fixture, rstest};

use super::init_contribution;

#[fixture]
fn now() -> NaiveDateTime {
	NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11)
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find(now: NaiveDateTime) {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = ApplicationProjection::new(contribution.id.clone(), 1.into(), now);
	let application2 = ApplicationProjection::new(contribution.id, 2.into(), now);

	<Client as ApplicationProjectionRepository>::insert(&client, application1.clone()).unwrap();
	<Client as ApplicationProjectionRepository>::insert(&client, application2.clone()).unwrap();

	let found_application = <Client as ApplicationProjectionRepository>::find(
		&client,
		application1.contribution_id(),
		application1.contributor_id(),
	)
	.unwrap();
	assert_eq!(found_application, Some(application1));

	let found_application = <Client as ApplicationProjectionRepository>::find(
		&client,
		application2.contribution_id(),
		application2.contributor_id(),
	)
	.unwrap();
	assert_eq!(found_application, Some(application2));

	let found_application = <Client as ApplicationProjectionRepository>::find(
		&client,
		&ContributionId::default(),
		&ContributorId::default(),
	)
	.unwrap();
	assert_eq!(found_application, None);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn must_be_unique(now: NaiveDateTime) {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = ApplicationProjection::new(contribution.id.clone(), 1.into(), now);
	let application2 = ApplicationProjection::new(contribution.id, 1.into(), now);

	<Client as ApplicationProjectionRepository>::insert(&client, application1).unwrap();
	let res = <Client as ApplicationProjectionRepository>::insert(&client, application2);

	assert!(res.is_err());
	assert_matches!(
		res.unwrap_err(),
		ApplicationProjectionRepositoryError::AlreadyExist(_)
	);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn find_return_none_if_not_found() {
	let client = Client::new(init_pool());

	let res = <Client as ApplicationProjectionRepository>::find(
		&client,
		&ContributionId::default(),
		&ContributorId::default(),
	);
	assert!(res.is_ok());
	assert_eq!(res.unwrap(), None)
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn cannot_apply_twice(now: NaiveDateTime) {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application = ApplicationProjection::new(contribution.id, 1.into(), now);

	<Client as ApplicationProjectionRepository>::insert(&client, application.clone()).unwrap();
	let res = <Client as ApplicationProjectionRepository>::insert(&client, application);

	assert!(res.is_err());
	assert_matches!(
		res.unwrap_err(),
		ApplicationProjectionRepositoryError::AlreadyExist(_)
	);
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_multiple_and_list(now: NaiveDateTime) {
	let client = Client::new(init_pool());

	let contribution = init_contribution(&client);

	let application1 = ApplicationProjection::new(contribution.id.clone(), 1.into(), now);

	let application2 = ApplicationProjection::new(contribution.id.clone(), 2.into(), now);

	<Client as ApplicationProjectionRepository>::insert(&client, application1.clone()).unwrap();
	<Client as ApplicationProjectionRepository>::insert(&client, application2.clone()).unwrap();

	let applications = <Client as ApplicationProjectionRepository>::list_by_contribution(
		&client,
		&contribution.id,
		None,
	)
	.unwrap();

	assert_eq!(
		applications,
		vec![application1.clone(), application2.clone()]
	);

	let applications = <Client as ApplicationProjectionRepository>::list_by_contribution(
		&client,
		&contribution.id,
		Some(application1.contributor_id().to_owned()),
	)
	.unwrap();

	assert_eq!(applications, vec![application1]);

	let applications = <Client as ApplicationProjectionRepository>::list_by_contribution(
		&client,
		&contribution.id,
		Some(application2.contributor_id().to_owned()),
	)
	.unwrap();

	assert_eq!(applications, vec![application2])
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn delete_all_for_contribution(now: NaiveDateTime) {
	let client = Client::new(init_pool());

	let project = init_project(&client);
	let contribution1 = init_contribution_with_id(&client, project.id, 1.into());
	let contribution2 = init_contribution_with_id(&client, project.id, 2.into());

	let application1 = ApplicationProjection::new(contribution1.id.clone(), 1.into(), now);
	let application2 = ApplicationProjection::new(contribution1.id.clone(), 2.into(), now);
	let application3 = ApplicationProjection::new(contribution2.id, 3.into(), now);

	<Client as ApplicationProjectionRepository>::insert(&client, application1.clone()).unwrap();
	<Client as ApplicationProjectionRepository>::insert(&client, application2.clone()).unwrap();
	<Client as ApplicationProjectionRepository>::insert(&client, application3.clone()).unwrap();

	<Client as ApplicationProjectionRepository>::delete_all_for_contribution(
		&client,
		&contribution1.id,
	)
	.unwrap();

	assert!(
		<Client as ApplicationProjectionRepository>::find(
			&client,
			application1.contribution_id(),
			application1.contributor_id()
		)
		.unwrap()
		.is_none()
	);
	assert!(
		<Client as ApplicationProjectionRepository>::find(
			&client,
			application2.contribution_id(),
			application2.contributor_id()
		)
		.unwrap()
		.is_none()
	);
	assert!(
		<Client as ApplicationProjectionRepository>::find(
			&client,
			application3.contribution_id(),
			application3.contributor_id()
		)
		.unwrap()
		.is_some()
	);
}
