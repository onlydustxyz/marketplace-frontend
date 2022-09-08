use std::str::FromStr;

use crate::database::{init_pool, Client};
use itertools::Itertools;
use marketplace_domain::*;
use rstest::*;

#[fixture]
fn project1() -> Project {
	Project {
		id: 111,
		name: "name1".to_string(),
		owner: "owner1".to_string(),
	}
}

#[fixture]
fn account1() -> ContributorAccount {
	ContributorAccount::from_str("0x1122").unwrap()
}

#[fixture]
fn projection1(project1: Project, account1: ContributorAccount) -> ProjectMemberProjection {
	ProjectMemberProjection::new(project1.id, account1, false)
}

#[fixture]
fn project2() -> Project {
	Project {
		id: 222,
		name: "name2".to_string(),
		owner: "owner2".to_string(),
	}
}

#[fixture]
fn account2() -> ContributorAccount {
	ContributorAccount::from_str("0x3344").unwrap()
}

#[fixture]
fn projection2(project2: Project, account2: ContributorAccount) -> ProjectMemberProjection {
	ProjectMemberProjection::new(project2.id, account2, true)
}

#[fixture]
fn account3() -> ContributorAccount {
	ContributorAccount::from_str("0x5566").unwrap()
}

#[fixture]
fn projection3(project1: Project, account3: ContributorAccount) -> ProjectMemberProjection {
	ProjectMemberProjection::new(project1.id, account3, false)
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find_one(
	project1: Project,
	projection1: ProjectMemberProjection,
	account1: ContributorAccount,
) {
	let client = Client::new(init_pool());

	<Client as ProjectMemberProjectionRepository>::store(&client, projection1).unwrap();
	let members =
		<Client as ProjectMemberProjectionRepository>::list_by_project(&client, &project1.id)
			.unwrap();

	assert_eq!(members.len(), 1);
	assert!(members.iter().map(|m| m.contributor_account()).contains(&account1));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find_multiple(
	project1: Project,
	projection1: ProjectMemberProjection,
	account1: ContributorAccount,
	project2: Project,
	projection2: ProjectMemberProjection,
	account2: ContributorAccount,
	projection3: ProjectMemberProjection,
	account3: ContributorAccount,
) {
	let client = Client::new(init_pool());

	<Client as ProjectMemberProjectionRepository>::store(&client, projection1).unwrap();
	<Client as ProjectMemberProjectionRepository>::store(&client, projection2).unwrap();
	<Client as ProjectMemberProjectionRepository>::store(&client, projection3).unwrap();
	let members =
		<Client as ProjectMemberProjectionRepository>::list_by_project(&client, &project1.id)
			.unwrap();

	assert_eq!(members.len(), 2);
	assert!(members.iter().map(|m| m.contributor_account()).contains(&account1));
	assert!(members.iter().map(|m| m.contributor_account()).contains(&account3));

	let members =
		<Client as ProjectMemberProjectionRepository>::list_by_project(&client, &project2.id)
			.unwrap();

	assert_eq!(members.len(), 1);
	assert!(members.iter().map(|m| m.contributor_account()).contains(&account2));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn delete_one(project1: Project, projection1: ProjectMemberProjection) {
	let client = Client::new(init_pool());

	<Client as ProjectMemberProjectionRepository>::store(&client, projection1.clone()).unwrap();
	<Client as ProjectMemberProjectionRepository>::delete(
		&client,
		projection1.project_id(),
		projection1.contributor_account(),
	)
	.unwrap();
	let members =
		<Client as ProjectMemberProjectionRepository>::list_by_project(&client, &project1.id)
			.unwrap();

	assert_eq!(members.len(), 0);
}
