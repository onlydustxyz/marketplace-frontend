use deathnote_contributions_feeder::domain;
use rocket_okapi::JsonSchema;
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct ProjectCreation<'r> {
    pub owner: &'r str,
    pub name: &'r str,
}

#[derive(Serialize, JsonSchema)]
pub struct Project {
    pub id: String,
    pub title: String,
    pub description: Option<String>,
    #[schemars(with = "String")]
    pub github_link: Url,
    #[schemars(with = "String")]
    pub logo: Url,
    pub contributions: Vec<Contribution>,
}

#[derive(Serialize, JsonSchema)]
pub struct Contribution {
    pub id: String,
    pub title: String,
    pub description: String,
    pub github_link: String,
    pub status: String,
    pub gate: u8,
    pub metadata: Metadata,
}

#[derive(Serialize, JsonSchema)]
pub struct Metadata {
    pub assignee: Option<String>,
    pub github_username: Option<String>,
    pub difficulty: Option<String>,
    pub technology: Option<String>,
    pub duration: Option<String>,
    pub context: Option<String>,
    pub r#type: Option<String>,
}

impl From<domain::Contribution> for Contribution {
    fn from(contribution: domain::Contribution) -> Self {
        Contribution {
            id: contribution.id,
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
