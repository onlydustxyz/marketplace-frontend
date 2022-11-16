use crate::{application::RefreshContributors, domain::*, infrastructure::github};
use marketplace_infrastructure::database;
use std::sync::Arc;

#[derive(Clone)]
pub struct Context {
	pub refresh_contributors_usecase: RefreshContributors,
}

impl Context {
	pub fn new(database: Arc<database::Client>, github: Arc<github::Client>) -> Self {
		Self {
			refresh_contributors_usecase: RefreshContributors::new(
				database.clone(),
				Arc::new(ContributorWithGithubDataProjector::new(
					github,
					database.clone(),
				)),
				database,
			),
		}
	}
}

impl juniper::Context for Context {}
