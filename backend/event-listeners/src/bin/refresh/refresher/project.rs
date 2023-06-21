use std::sync::Arc;

use domain::Project;
use event_listeners::listeners::*;
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let project_projector = project::Projector::new(
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
	);

	let budget_projector = budget::Projector::new(
		database.clone(),
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
