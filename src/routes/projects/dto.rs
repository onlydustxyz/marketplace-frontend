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
    #[schemars(with = "String")]
    pub github_link: Url,
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
