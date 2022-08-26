use crate::GithubProjectId;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Project {
	pub id: GithubProjectId,
	pub owner: String,
	pub name: String,
}
