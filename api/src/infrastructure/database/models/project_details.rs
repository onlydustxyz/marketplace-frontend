use crate::domain::ProjectDetails;
use ::infrastructure::database::schema::*;
use diesel::{AsChangeset, Insertable};
use serde::{Deserialize, Serialize};

#[derive(Insertable, Debug, Serialize, Deserialize, AsChangeset)]
pub struct ProjectDetail {
	project_id: uuid::Uuid,
	github_repo_id: i64,
	description: Option<String>,
	telegram_link: Option<String>,
}

impl From<ProjectDetails> for ProjectDetail {
	fn from(project_details: ProjectDetails) -> Self {
		ProjectDetail {
			project_id: (*project_details.project_id()).into(),
			github_repo_id: (*project_details.github_repo_id()).into(),
			description: project_details.description().clone(),
			telegram_link: project_details.telegram_link().clone(),
		}
	}
}
