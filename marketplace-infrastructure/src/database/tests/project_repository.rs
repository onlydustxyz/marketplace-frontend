use crate::database::{init_pool, Client};
use itertools::Itertools;
use marketplace_domain::*;
use uuid::Uuid;

#[test]
#[ignore = "require a database"]
fn store_and_find_one() {
	let client = Client::new(init_pool());

	let project = Project {
		id: Uuid::new_v4().to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};

	<Client as ProjectRepository>::store(&client, project.clone()).unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	projects.iter().map(|p| &p.project).contains(&project);
}

#[test]
#[ignore = "require a database"]
fn store_and_find_multiple() {
	let client = Client::new(init_pool());

	let project1 = Project {
		id: Uuid::new_v4().to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};
	let project2 = Project {
		id: Uuid::new_v4().to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};

	<Client as ProjectRepository>::store(&client, project1.clone()).unwrap();
	<Client as ProjectRepository>::store(&client, project2.clone()).unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	projects.iter().map(|p| &p.project).contains(&project1);
	projects.iter().map(|p| &p.project).contains(&project2);
}

#[test]
#[ignore = "require a database"]
fn store_and_find_with_contributions() {
	let client = Client::new(init_pool());

	let project = Project {
		id: Uuid::new_v4().to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};
	let contribution1 = Contribution {
		id: Uuid::new_v4().into(),
		onchain_id: Uuid::new_v4().to_string(),
		project_id: project.id.clone(),
		contributor_id: None,
		title: None,
		description: None,
		status: ContributionStatus::Open,
		external_link: None,
		gate: 0,
		metadata: Default::default(),
		validator: Default::default(),
	};
	let contribution2 = Contribution {
		id: Uuid::new_v4().into(),
		onchain_id: Uuid::new_v4().to_string(),
		project_id: project.id.clone(),
		contributor_id: None,
		title: None,
		description: None,
		status: ContributionStatus::Open,
		external_link: None,
		gate: 0,
		metadata: Default::default(),
		validator: Default::default(),
	};

	<Client as ProjectRepository>::store(&client, project.clone()).unwrap();
	<Client as ContributionRepository>::create(&client, contribution1.clone(), Default::default())
		.unwrap();
	<Client as ContributionRepository>::create(&client, contribution2.clone(), Default::default())
		.unwrap();
	let projects = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	let foud_project = projects.iter().find(|s| s.project == project).unwrap();
	assert_eq!(foud_project.contributions.len(), 2);
	assert_eq!(foud_project.contributions[0], contribution1);
	assert_eq!(foud_project.contributions[1], contribution2);
}
