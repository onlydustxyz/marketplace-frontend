use std::sync::Arc;

use domain::Application;
use event_listeners::listeners::*;
use infrastructure::database;

use super::{Refreshable, Refresher};

pub fn create(database: Arc<database::Client>) -> impl Refreshable {
	let application_projector = application::Projector::new(database.clone());

	Refresher::<Application>::new(database, vec![Arc::new(application_projector)])
}
