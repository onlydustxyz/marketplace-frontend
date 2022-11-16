use super::Projection;
use marketplace_domain::{Contributor, GithubUserId};
#[cfg(test)]
use mockall::automock;
use thiserror::Error;
use uuid::Uuid;

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorProfile {
	pub id: Uuid,
	pub github_identifier: Option<GithubUserId>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

impl Projection for ContributorProfile {
	type A = Contributor;
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor not found")]
	NotFound,
	#[error("Contributor already exist")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn upsert_github_user_data(&self, contributor: ContributorProfile) -> Result<(), Error>;
	fn upsert_discord_handle(&self, contributor: ContributorProfile) -> Result<(), Error>;
	fn find_by_id(&self, id: &Uuid) -> Result<ContributorProfile, Error>;
}
