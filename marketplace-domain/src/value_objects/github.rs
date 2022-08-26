use url::Url;
pub type ProjectId = i64;
pub type IssueNumber = i64;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Issue {
	pub number: IssueNumber,
	pub project_id: ProjectId,
	pub title: String,
	pub description: Option<String>,
	pub external_link: Url,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}
