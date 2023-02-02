use std::sync::Arc;

use domain::Project;
use event_listeners::{
	domain::ProjectProjector,
	infrastructure::database::{
		BudgetRepository, GithubRepoDetailsRepository, ProjectLeadRepository, ProjectRepository,
	},
};
use infrastructure::{database, github};

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>, github: Arc<github::Client>) -> impl Refreshable {
	let projector = ProjectProjector::new(
		ProjectRepository::new(database.clone()),
		ProjectLeadRepository::new(database.clone()),
		github,
		GithubRepoDetailsRepository::new(database.clone()),
		BudgetRepository::new(database.clone()),
	);

	Refresher::<Project>::new(database, Arc::new(projector))
}
