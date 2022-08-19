mod models;

use anyhow::Result;
use std::{collections::HashMap, sync::Arc};

use onlydust_domain::{self as domain, *};

impl From<models::RepositoryWithExtension> for Project {
	fn from(repo: models::RepositoryWithExtension) -> Self {
		Self {
			id: repo.inner.id.to_string(),
			owner: repo.inner.owner.expect("Invalid repo owner received from github API").login,
			name: repo.inner.name,
		}
	}
}

pub struct API {
	octo: Arc<octocrab::Octocrab>,
}

impl API {
	pub fn initialize() {
		let mut builder = octocrab::Octocrab::builder();

		if let Ok(github_token) = std::env::var("GITHUB_TOKEN") {
			builder = builder.personal_token(github_token);
		}

		octocrab::initialise(builder).expect("Unable to initialize octocrab");
	}

	pub fn new() -> Self {
		API {
			octo: octocrab::instance(),
		}
	}

	pub async fn issue(
		&self,
		project_id: u128,
		issue_number: u128,
	) -> Result<octocrab::models::issues::Issue> {
		self.octo
			.get::<octocrab::models::issues::Issue, String, ()>(
				format!(
					"{}repositories/{}/issues/{}",
					self.octo.base_url, project_id, issue_number
				),
				None,
			)
			.await
			.map_err(anyhow::Error::msg)
	}

	pub async fn user(&self, user_id: &str) -> Result<octocrab::models::User> {
		self.octo
			.get::<octocrab::models::User, String, ()>(
				format!("{}user/{}", self.octo.base_url, user_id),
				None,
			)
			.await
			.map_err(anyhow::Error::msg)
	}

	pub async fn repository_by_id(
		&self,
		project_id_: &str,
	) -> Result<octocrab::models::Repository> {
		self.octo
			.get::<octocrab::models::Repository, String, ()>(
				format!("{}repositories/{}", self.octo.base_url, project_id_),
				None,
			)
			.await
			.map_err(anyhow::Error::msg)
	}

	pub async fn get_project_by_owner_and_name(&self, owner: &str, name: &str) -> Result<Project> {
		let repo = self
			.octo
			.get::<models::RepositoryWithExtension, String, ()>(
				format!("{}repos/{}/{}", self.octo.base_url, owner, name),
				None::<&()>,
			)
			.await?;

		Ok(repo.into())
	}
}

impl Default for API {
	fn default() -> Self {
		Self::new()
	}
}

pub fn extract_metadata(
	github_issue: octocrab::models::issues::Issue,
) -> domain::ContributionMetadata {
	let labels: HashMap<String, String> = github_issue
		.labels
		.into_iter()
		.filter_map(|label| {
			let splitted: Vec<_> = label.name.split(':').collect();
			if splitted.len() == 2 {
				Some((splitted[0].trim().to_owned(), splitted[1].trim().to_owned()))
			} else {
				None
			}
		})
		.collect();

	domain::ContributionMetadata {
		context: labels.get("Context").map(|x| x.to_owned()),
		difficulty: labels.get("Difficulty").map(|x| x.to_owned()),
		duration: labels.get("Duration").map(|x| x.to_owned()),
		technology: labels.get("Techno").map(|x| x.to_owned()),
		r#type: labels.get("Type").map(|x| x.to_owned()),
	}
}
