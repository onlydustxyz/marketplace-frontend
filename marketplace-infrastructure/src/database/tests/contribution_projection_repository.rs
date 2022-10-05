use crate::database::{
	init_pool,
	tests::{init_contribution, init_project},
	Client,
};

use marketplace_domain::*;

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn find_by_id() {
	let client = Client::new(init_pool());

	let project = init_project(&client);

	let contribution1 = init_contribution(&client, project.id);
	let contribution2 = init_contribution(&client, project.id);

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
	let contribution = init_contribution(&client, project.id);

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

#[test]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn find() {
	let client = Client::new(init_pool());

	let project1 = init_project(&client);
	let project2 = init_project(&client);

	let contribution1 = init_contribution(&client, project1.id);
	let contribution2 = init_contribution(&client, project1.id);
	let contribution3 = init_contribution(&client, project2.id);

	// No filters
	let found_contributions =
		<Client as ContributionProjectionRepository>::find(&client, &[]).unwrap();
	assert_eq!(found_contributions.len(), 3);
	assert!(found_contributions.iter().find(|c| c.id == contribution1.id).is_some());
	assert!(found_contributions.iter().find(|c| c.id == contribution2.id).is_some());
	assert!(found_contributions.iter().find(|c| c.id == contribution3.id).is_some());

	// Filter by project
	let found_contributions = <Client as ContributionProjectionRepository>::find(
		&client,
		&[ContributionProjectionFilter::Project(project1.id)],
	)
	.unwrap();
	assert_eq!(found_contributions.len(), 2);
	assert!(found_contributions.iter().find(|c| c.id == contribution1.id).is_some());
	assert!(found_contributions.iter().find(|c| c.id == contribution2.id).is_some());

	// Filter by contributor
	let contributor_id: ContributorAccountAddress = rand::random::<u128>().into();
	<Client as ContributionProjectionRepository>::update_contributor_and_status(
		&client,
		&contribution1.id,
		Some(&contributor_id),
		Default::default(),
	)
	.unwrap();
	<Client as ContributionProjectionRepository>::update_contributor_and_status(
		&client,
		&contribution3.id,
		Some(&contributor_id),
		Default::default(),
	)
	.unwrap();
	let found_contributions = <Client as ContributionProjectionRepository>::find(
		&client,
		&[ContributionProjectionFilter::Contributor(
			contributor_id.clone(),
		)],
	)
	.unwrap();

	assert_eq!(found_contributions.len(), 2);
	assert!(found_contributions.iter().find(|c| c.id == contribution1.id).is_some());
	assert!(found_contributions.iter().find(|c| c.id == contribution3.id).is_some());

	// Filter by contributor and project
	let found_contributions = <Client as ContributionProjectionRepository>::find(
		&client,
		&[
			ContributionProjectionFilter::Project(project1.id),
			ContributionProjectionFilter::Contributor(contributor_id),
		],
	)
	.unwrap();
	assert_eq!(found_contributions.len(), 1);
	assert!(found_contributions.iter().find(|c| c.id == contribution1.id).is_some());
}
