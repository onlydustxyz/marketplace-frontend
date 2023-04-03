use std::sync::Arc;

use domain::Project;
use event_listeners::{
	domain::{BudgetProjector, CrmProjector, ProjectProjector},
	infrastructure::database::{
		BudgetRepository, CrmGithubRepoRepository, GithubRepoDetailsRepository, PaymentRepository,
		PaymentRequestRepository, ProjectGithubRepoDetailsRepository, ProjectLeadRepository,
		ProjectRepository, WorkItemRepository,
	},
};
use infrastructure::{database, github};

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>, github: Arc<github::Client>) -> impl Refreshable {
	let project_projector = ProjectProjector::new(
		ProjectRepository::new(database.clone()),
		ProjectLeadRepository::new(database.clone()),
		GithubRepoDetailsRepository::new(database.clone()),
		ProjectGithubRepoDetailsRepository::new(database.clone()),
		github.clone(),
	);

	let budget_projector = BudgetProjector::new(
		PaymentRequestRepository::new(database.clone()),
		PaymentRepository::new(database.clone()),
		BudgetRepository::new(database.clone()),
		WorkItemRepository::new(database.clone()),
	);

	let crm_projector = CrmProjector::new(CrmGithubRepoRepository::new(database.clone()), github);

	Refresher::<Project>::new(
		database,
		vec![
			Arc::new(project_projector),
			Arc::new(budget_projector),
			Arc::new(crm_projector),
		],
	)
}
