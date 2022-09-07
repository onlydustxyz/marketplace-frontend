mod errors;
mod github_service;
mod models;

pub use errors::Error as GithubError;

use log::error;
use std::{collections::HashMap, sync::Arc};

use marketplace_domain::{self as domain, *};

use errors::Error;

impl From<models::RepositoryWithExtension> for Project {
	fn from(repo: models::RepositoryWithExtension) -> Self {
		Self {
			id: repo.inner.id.0,
			owner: repo.inner.owner.expect("Invalid repo owner received from github API").login,
			name: repo.inner.name,
		}
	}
}

pub struct Client {
	octo: Arc<octocrab::Octocrab>,
}

pub struct OctocrabIssue {
	pub issue: octocrab::models::issues::Issue,
	pub project_id: GithubProjectId,
}

impl Client {
	pub fn initialize() {
		let mut builder = octocrab::Octocrab::builder();

		if let Ok(github_token) = std::env::var("GITHUB_TOKEN") {
			builder = builder.personal_token(github_token);
		}

		octocrab::initialise(builder).expect("Unable to initialize octocrab");
	}

	pub fn new() -> Self {
		Client {
			octo: octocrab::instance(),
		}
	}

	async fn get<R: octocrab::FromResponse>(&self, url: &str) -> Result<R, anyhow::Error> {
		self.octo.get::<R, &str, ()>(url, None).await.map_err(|e| {
			error!("Failed to get data from github api at {url}: {e}");
			e.into()
		})
	}

	pub async fn issue(&self, project_id: u64, issue_number: i64) -> Result<OctocrabIssue, Error> {
		let issue = self
			.get(&format!(
				"{}repositories/{}/issues/{}",
				self.octo.base_url, project_id, issue_number
			))
			.await?;

		Ok(OctocrabIssue { issue, project_id })
	}

	pub async fn user(&self, user_id: &str) -> Result<octocrab::models::User, Error> {
		let user = self
			.get::<octocrab::models::User>(&format!("{}user/{}", self.octo.base_url, user_id))
			.await?;

		Ok(user)
	}

	pub async fn repository_by_id(
		&self,
		project_id_: u64,
	) -> Result<octocrab::models::Repository, Error> {
		let id = self
			.get::<octocrab::models::Repository>(&format!(
				"{}repositories/{}",
				self.octo.base_url, project_id_
			))
			.await?;

		Ok(id)
	}

	pub async fn get_project_by_owner_and_name(
		&self,
		owner: &str,
		name: &str,
	) -> Result<Project, Error> {
		let repo = self
			.get::<models::RepositoryWithExtension>(&format!(
				"{}repos/{}/{}",
				self.octo.base_url, owner, name
			))
			.await?;

		Ok(repo.into())
	}
}

impl Default for Client {
	fn default() -> Self {
		Self::new()
	}
}

pub fn extract_metadata(
	github_issue: &octocrab::models::issues::Issue,
) -> domain::ContributionProjectionMetadata {
	let labels: HashMap<String, String> = github_issue
		.labels
		.iter()
		.filter_map(|label| {
			let splitted: Vec<_> = label.name.split(':').collect();
			if splitted.len() == 2 {
				Some((splitted[0].trim().to_owned(), splitted[1].trim().to_owned()))
			} else {
				None
			}
		})
		.collect();

	domain::ContributionProjectionMetadata {
		context: labels.get("Context").map(|x| x.to_owned()),
		difficulty: labels.get("Difficulty").map(|x| x.to_owned()),
		duration: labels.get("Duration").map(|x| x.to_owned()),
		technology: labels.get("Techno").map(|x| x.to_owned()),
		r#type: labels.get("Type").map(|x| x.to_owned()),
	}
}
