use crate::{
	domain::{
		Contribution, ContributionRepository, ContributionStatus, Project, ProjectRepository,
	},
	infrastructure::database::{init_pool, Client},
};
use uuid::Uuid;

#[test]
#[ignore = "require a database"]
fn store_and_find_one() {
	let client = Client::new(init_pool());

	let project = Project {
		id: "id".to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};

	<Client as ProjectRepository>::store(&client, project.clone()).unwrap();
	let x = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	assert!(x.len() == 1);
	assert!(x[0].project == project);
}

#[test]
#[ignore = "require a database"]
fn store_and_find_multiple() {
	let client = Client::new(init_pool());

	let project1 = Project {
		id: "id1".to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};
	let project2 = Project {
		id: "id2".to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};

	<Client as ProjectRepository>::store(&client, project1.clone()).unwrap();
	<Client as ProjectRepository>::store(&client, project2.clone()).unwrap();
	let x = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	assert!(x.len() == 2);
	assert!(x[0].project == project1);
	assert!(x[1].project == project2);
}

#[test]
#[ignore = "require a database"]
fn store_and_find_with_contributions() {
	let client = Client::new(init_pool());

	let project = Project {
		id: "id".to_string(),
		name: "name".to_string(),
		owner: "owner".to_string(),
	};
	let contribution1 = Contribution {
		id: Uuid::from_u128(0).into(),
		onchain_id: "id1".to_string(),
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
		id: Uuid::from_u128(1).into(),
		onchain_id: "id2".to_string(),
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
	<Client as ContributionRepository>::store(&client, contribution1.clone(), Default::default())
		.unwrap();
	<Client as ContributionRepository>::store(&client, contribution2.clone(), Default::default())
		.unwrap();
	let x = <Client as ProjectRepository>::find_all_with_contributions(&client).unwrap();

	assert!(x.len() == 1);
	assert!(x[0].project == project);
	assert!(x[0].contributions.len() == 2);
	assert!(x[0].contributions == vec![contribution1, contribution2]);
}
