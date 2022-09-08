use marketplace_domain as domain;
use rocket_okapi::JsonSchema;
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct ProjectCreation<'r> {
	pub owner: &'r str,
	pub name: &'r str,
}

#[derive(Serialize, JsonSchema, Deserialize, Clone)]
pub struct Project {
	pub id: String,
	pub title: String,
	pub description: Option<String>,
	#[schemars(with = "String")]
	pub github_link: Url,
	#[schemars(with = "String")]
	pub logo: Option<Url>,
	pub contributions: Vec<Contribution>,
	pub members: Vec<Member>,
}

#[derive(Serialize, Deserialize, JsonSchema, Clone)]
pub struct Contribution {
	pub id: String,
	pub title: String,
	pub description: String,
	pub github_link: String,
	pub status: String,
	pub gate: u8,
	pub metadata: Metadata,
}

#[derive(Serialize, Deserialize, JsonSchema, Clone)]
pub struct Metadata {
	pub assignee: Option<String>,
	pub github_username: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}

#[derive(Serialize, Deserialize, JsonSchema, Clone)]
pub struct Member {
	contributor_account: String,
	is_lead_contributor: bool,
}

impl From<domain::ContributionProjection> for Contribution {
	fn from(contribution: domain::ContributionProjection) -> Self {
		Contribution {
			id: contribution.id.to_string(),
			title: contribution.title.unwrap_or_default(),
			description: contribution.description.unwrap_or_default(),
			github_link: match contribution.external_link {
				Some(link) => link.to_string(),
				None => "".to_string(),
			},
			status: contribution.status.to_string(),
			gate: contribution.gate,
			metadata: Metadata {
				assignee: contribution.contributor_id.map(|id| id.to_string()),
				github_username: None,
				difficulty: contribution.metadata.difficulty,
				technology: contribution.metadata.technology,
				duration: contribution.metadata.duration,
				context: contribution.metadata.context,
				r#type: contribution.metadata.r#type,
			},
		}
	}
}

impl From<domain::ProjectMemberProjection> for Member {
	fn from(member: domain::ProjectMemberProjection) -> Self {
		Member {
			contributor_account: member.contributor_account().to_string(),
			is_lead_contributor: member.is_lead_contributor(),
		}
	}
}
