use std::sync::Arc;

use domain::Project;
use event_listeners::{
	domain::{BudgetProjector, ProjectProjector},
	infrastructure::database::{
		ApplicationRepository, BudgetRepository, PaymentRepository, PaymentRequestRepository,
		ProjectGithubReposRepository, ProjectLeadRepository, ProjectRepository, WorkItemRepository,
	},
};
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let project_projector = ProjectProjector::new(
		ProjectRepository::new(database.clone()),
		ProjectLeadRepository::new(database.clone()),
		ProjectGithubReposRepository::new(database.clone()),
		database.clone(),
		ApplicationRepository::new(database.clone()),
	);

	let budget_projector = BudgetProjector::new(
		PaymentRequestRepository::new(database.clone()),
		PaymentRepository::new(database.clone()),
		BudgetRepository::new(database.clone()),
		WorkItemRepository::new(database.clone()),
		database.clone(),
		database.clone(),
	);

	Refresher::<Project>::new(
		database,
		vec![Arc::new(project_projector), Arc::new(budget_projector)],
	)
}
