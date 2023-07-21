use domain::ProjectId;
use infrastructure::database::enums::ProjectVisibility;

#[derive(Debug, Clone, Queryable, PartialEq, Eq)]
#[diesel(table_name = project_details, primary_key(project_id))]
pub struct ProjectDetails {
	pub project_id: ProjectId,
	pub telegram_link: Option<String>,
	pub logo_url: Option<String>,
	pub name: String,
	pub short_description: String,
	pub long_description: String,
	pub hiring: bool,
	pub rank: i32,
	pub visibility: ProjectVisibility,
	pub key: String,
}
