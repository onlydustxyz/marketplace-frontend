use rocket_okapi::JsonSchema;
use serde::{Deserialize, Serialize};
use url::Url;

use marketplace_domain as domain;
use uuid::Uuid;

use super::Contribution;

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct ProjectCreation<'r> {
	pub owner: &'r str,
	pub name: &'r str,
}

#[derive(Debug, Serialize, JsonSchema, Deserialize, Clone)]
pub struct Project {
	pub id: String,
	pub title: String,
	pub description: Option<String>,
	#[schemars(with = "String")]
	pub github_link: Url,
	#[schemars(with = "String")]
	pub logo: Option<Url>,
	pub contributions: Vec<Contribution>,
	pub lead_contributors: Vec<String>,
	pub members: Vec<String>,
}

#[derive(Serialize, Deserialize, JsonSchema, Clone)]
pub struct Member {
	project_id: String,
	contributor_id: Uuid,
}

impl From<domain::ProjectMemberProjection> for Member {
	fn from(member: domain::ProjectMemberProjection) -> Self {
		Member {
			project_id: member.project_id().to_string(),
			contributor_id: *member.contributor_id(),
		}
	}
}
