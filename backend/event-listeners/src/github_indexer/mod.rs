use std::sync::Arc;

use anyhow::Result;
use domain::{GithubRepoId, GithubUserId};
use infrastructure::{database, github};
use olog::info;

use self::controller::Controller;
use crate::Config;

mod controller;
pub mod indexers;
mod repository;

pub struct Scheduler {
	repo_indexing: Controller<GithubRepoId>,
	user_indexing: Controller<GithubUserId>,
}

impl Scheduler {
	pub fn new(config: Config) -> Result<Self> {
		let github: Arc<github::Client> = github::RoundRobinClient::new(config.github)?.into();
		let database = Arc::new(database::Client::new(database::init_pool(config.database)?));

		Ok(Scheduler {
			repo_indexing: Controller::new(
				database.clone(),
				vec![
					Arc::new(indexers::repo::new(
						github.clone(),
						database.clone(),
						database.clone(),
						database.clone(),
					)),
					Arc::new(indexers::issues::new(
						github.clone(),
						database.clone(),
						database.clone(),
						database.clone(),
						database.clone(),
						database.clone(),
						database.clone(),
					)),
					Arc::new(indexers::pull_requests::new(
						github.clone(),
						database.clone(),
						Arc::new(indexers::pull_request::new(
							github.clone(),
							database.clone(),
							database.clone(),
							database.clone(),
							database.clone(),
							database.clone(),
							database.clone(),
						)),
					)),
				],
			),
			user_indexing: Controller::new(
				database.clone(),
				vec![Arc::new(indexers::user::new(
					github.clone(),
					database.clone(),
					database.clone(),
				))],
			),
		})
	}

	pub async fn run(&self) -> Result<()> {
		loop {
			info!("🎶 Still alive 🎶");
			self.repo_indexing.index_all().await?;
			self.user_indexing.index_all().await?;
		}
	}
}
