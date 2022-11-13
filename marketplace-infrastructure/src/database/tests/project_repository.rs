use crate::database::Client;
use itertools::Itertools;
use marketplace_domain::*;
use marketplace_tests::init_pool;
use rstest::*;
use std::str::FromStr;

#[fixture]
fn project1() -> Project {
	Project {
		id: 111,
		name: "name".to_string(),
		owner: "owner".to_string(),
	}
}

#[fixture]
fn projection1(project1: Project) -> ProjectProjection {
	ProjectProjection {
		id: project1.id,
		owner: project1.owner,
		name: project1.name,
		..Default::default()
	}
}

#[fixture]
fn project2() -> Project {
	Project {
		id: 222,
		name: "name".to_string(),
		owner: "owner".to_string(),
	}
}

#[fixture]
fn projection2(project2: Project) -> ProjectProjection {
	ProjectProjection {
		id: project2.id,
		owner: project2.owner,
		name: project2.name,
		..Default::default()
	}
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find_one(project1: Project, projection1: ProjectProjection) {
	let client = Client::new(init_pool());

	<Client as ProjectProjectionRepository>::insert(&client, projection1).unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	assert!(projects.iter().map(|p| &p.project).contains(&project1));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find_multiple(
	project1: Project,
	projection1: ProjectProjection,
	project2: Project,
	projection2: ProjectProjection,
) {
	let client = Client::new(init_pool());

	<Client as ProjectProjectionRepository>::insert(&client, projection1).unwrap();
	<Client as ProjectProjectionRepository>::insert(&client, projection2).unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	assert!(projects.iter().map(|p| &p.project).contains(&project1));
	assert!(projects.iter().map(|p| &p.project).contains(&project2));
}

#[rstest]
#[cfg_attr(
	not(feature = "with_infrastructure_tests"),
	ignore = "infrastructure test"
)]
fn store_and_find_with_contributions(project1: Project, projection1: ProjectProjection) {
	let client = Client::new(init_pool());

	let contribution1 = GithubContribution {
		id: ContributionId::from_str("0x01").unwrap(),
		project_id: project1.id,
		issue_number: 23,
		contributor_id: None,
		title: None,
		description: None,
		status: ContributionStatus::Open,
		external_link: None,
		gate: 0,
		metadata: Default::default(),
		closed: false,
	};
	let contribution2 = GithubContribution {
		id: ContributionId::from_str("0x02").unwrap(),
		project_id: project1.id,
		issue_number: 34,
		contributor_id: None,
		title: None,
		description: None,
		status: ContributionStatus::Open,
		external_link: None,
		gate: 0,
		metadata: Default::default(),
		closed: false,
	};

	<Client as ProjectProjectionRepository>::insert(&client, projection1).unwrap();
	<Client as ContributionProjectionRepository>::insert(&client, contribution1.clone()).unwrap();
	<Client as ContributionProjectionRepository>::insert(&client, contribution2.clone()).unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	let foud_project = projects.iter().find(|s| s.project == project1).unwrap();
	assert_eq!(foud_project.contributions.len(), 2);
	assert_eq!(foud_project.contributions[0], contribution1);
	assert_eq!(foud_project.contributions[1], contribution2);
}
