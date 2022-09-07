use crate::GithubProjectId;

pub type Id = GithubProjectId;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Project {
	pub id: Id,
	pub owner: String,
	pub name: String,
}
