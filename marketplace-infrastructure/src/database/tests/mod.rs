use uuid::Uuid;

use marketplace_domain::{ContributionProjection, Project};

mod application_repository;
mod contact_information_repository;
mod contribution_projection_repository;
mod project_repository;

use marketplace_domain::*;

use super::Client;

fn init_project(client: &Client) -> Project {
	let project = Project {
		id: 666,
		name: Uuid::new_v4().to_string(),
		owner: Uuid::new_v4().to_string(),
	};
	<Client as ProjectRepository>::store(client, project.clone()).unwrap();

	project
}

fn init_contribution(client: &Client) -> ContributionProjection {
	init_contribution_with_status(client, Default::default())
}

fn init_contribution_with_status(
	client: &Client,
	status: ContributionStatus,
) -> ContributionProjection {
	let project = init_project(client);

	let contribution = ContributionProjection {
		id: 1.into(),
		project_id: project.id,
		status,
		..Default::default()
	};
	<Client as ContributionProjectionRepository>::create(client, contribution.clone()).unwrap();

	contribution
}
