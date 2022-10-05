use uuid::Uuid;

use marketplace_domain::ContributionProjection;

mod application_repository;
mod contact_information_repository;
mod contribution_projection_repository;
mod project_repository;

use marketplace_domain::*;

use super::Client;

fn init_project(client: &Client) -> ProjectProjection {
	let project = ProjectProjection {
		id: rand::random(),
		name: Uuid::new_v4().to_string(),
		owner: Uuid::new_v4().to_string(),
		..Default::default()
	};
	<Client as ProjectProjectionRepository>::insert(client, project.clone()).unwrap();

	project
}

fn init_contribution(client: &Client, project_id: u64) -> ContributionProjection {
	init_contribution_with_status(client, Default::default(), project_id)
}

fn init_contribution_with_status(
	client: &Client,
	status: ContributionStatus,
	project_id: u64,
) -> ContributionProjection {
	let contribution = ContributionProjection {
		id: rand::random::<u128>().into(),
		project_id,
		status,
		..Default::default()
	};
	<Client as ContributionProjectionRepository>::insert(client, contribution.clone()).unwrap();

	contribution
}

fn init_contribution_with_id(
	client: &Client,
	project_id: ProjectId,
	contribution_id: ContributionId,
) -> ContributionProjection {
	let contribution = ContributionProjection {
		id: contribution_id,
		project_id,
		..Default::default()
	};
	<Client as ContributionProjectionRepository>::insert(client, contribution.clone()).unwrap();

	contribution
}
