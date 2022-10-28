use crate::database::{
	tests::{init_contribution, init_project},
	Client,
};
use marketplace_domain::*;
use marketplace_tests::init_pool;

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
		Some(GithubContribution {
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

	let found_contributions =
		<Client as ContributionProjectionRepository>::list_all(&client).unwrap();
	assert_eq!(found_contributions.len(), 3);
	assert!(found_contributions.iter().any(|c| c.id == contribution1.id));
	assert!(found_contributions.iter().any(|c| c.id == contribution2.id));
	assert!(found_contributions.iter().any(|c| c.id == contribution3.id));
}
