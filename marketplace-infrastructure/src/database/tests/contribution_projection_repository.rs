use crate::database::{init_pool, tests::init_project, Client};

use marketplace_domain::*;

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find() {
	let client = Client::new(init_pool());

	let project = init_project(&client);

	let contribution1 = ContributionProjection {
		id: 1.into(),
		project_id: project.id,
		..Default::default()
	};
	let contribution2 = ContributionProjection {
		id: 2.into(),
		project_id: project.id,
		..Default::default()
	};

	<Client as ContributionProjectionRepository>::insert(&client, contribution1.clone()).unwrap();
	<Client as ContributionProjectionRepository>::insert(&client, contribution2.clone()).unwrap();

	let found_contribution =
		<Client as ContributionProjectionRepository>::find_by_id(&client, &contribution1.id)
			.unwrap();
	assert_eq!(found_contribution, Some(contribution1));

	let found_contribution =
		<Client as ContributionProjectionRepository>::find_by_id(&client, &contribution2.id)
			.unwrap();
	assert_eq!(found_contribution, Some(contribution2));
}

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_update_gate() {
	let new_gate = 5;

	let client = Client::new(init_pool());

	let project = init_project(&client);

	let contribution = ContributionProjection {
		id: 1.into(),
		project_id: project.id,
		..Default::default()
	};
	<Client as ContributionProjectionRepository>::insert(&client, contribution.clone()).unwrap();
	<Client as ContributionProjectionRepository>::update_gate(
		&client,
		contribution.id.clone(),
		new_gate,
	)
	.unwrap();

	let found_contribution =
		<Client as ContributionProjectionRepository>::find_by_id(&client, &contribution.id)
			.unwrap();
	assert_eq!(
		found_contribution,
		Some(ContributionProjection {
			gate: new_gate,
			..contribution
		})
	);
}
