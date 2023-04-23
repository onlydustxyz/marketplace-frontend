use domain::MessagePayload;
use serde::{Deserialize, Serialize};

pub mod crm;
pub mod pulls;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(transparent)]
pub struct GithubEvent(octocrab::models::events::Event);

impl MessagePayload for GithubEvent {}
