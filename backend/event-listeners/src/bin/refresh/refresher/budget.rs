use std::sync::Arc;

use domain::Budget;
use event_listeners::listeners::*;
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let budget_projector = budget::Projector::new(database.clone());
	Refresher::<Budget>::new(database, vec![Arc::new(budget_projector)])
}
