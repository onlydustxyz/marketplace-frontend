use std::sync::Arc;

use domain::Project;
use event_listeners::{
	domain::{BudgetProjector, ProjectProjector},
	infrastructure::database::{ProjectGithubReposRepository, ProjectLeadRepository},
};
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let project_projector = ProjectProjector::new(
		database.clone(),
		ProjectLeadRepository::new(database.clone()),
		ProjectGithubReposRepository::new(database.clone()),
		database.clone(),
		database.clone(),
	);

	let budget_projector = BudgetProjector::new(
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
	);

	Refresher::<Project>::new(
		database,
		vec![Arc::new(project_projector), Arc::new(budget_projector)],
	)
}
