use std::sync::Arc;

use marketplace_domain::{ContributorWithGithubDataProjector, ProjectLeadProjector};
use marketplace_infrastructure::{database, github};

use crate::application::{RefreshContributors, RefreshProjectLeads};

#[derive(Clone)]
pub struct Context {
	pub refresh_contributors_usecase: RefreshContributors,
	pub refresh_project_leads_usecase: RefreshProjectLeads,
}

impl Context {
	pub fn new(database: Arc<database::Client>, github: Arc<github::Client>) -> Self {
		Self {
			refresh_contributors_usecase: RefreshContributors::new(
				database.clone(),
				Arc::new(ProjectLeadProjector::new(database.clone())),
				database.clone(),
			),
			refresh_project_leads_usecase: RefreshProjectLeads::new(
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
