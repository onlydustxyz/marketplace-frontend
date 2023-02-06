use std::sync::Arc;

use domain::Project;
use event_listeners::{
	domain::{BudgetProjector, ProjectProjector},
	infrastructure::database::{
		BudgetRepository, GithubRepoDetailsRepository, ProjectLeadRepository, ProjectRepository,
	},
};
use infrastructure::{database, github};

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>, github: Arc<github::Client>) -> impl Refreshable {
	let project_projector = ProjectProjector::new(
		ProjectRepository::new(database.clone()),
		ProjectLeadRepository::new(database.clone()),
		github,
		GithubRepoDetailsRepository::new(database.clone()),
		BudgetRepository::new(database.clone()),
	);

	let budget_projector = BudgetProjector::new(BudgetRepository::new(database.clone()));

	Refresher::<Project>::new(
		database,
		vec![Arc::new(project_projector), Arc::new(budget_projector)],
	)
}
