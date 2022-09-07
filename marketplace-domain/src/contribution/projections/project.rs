use crate::{GithubProjectId, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Project {
	id: GithubProjectId,
	owner: String,
	name: String,
}

impl Projection for Project {}

impl Project {
	pub fn new(id: GithubProjectId, owner: String, name: String) -> Self {
		Self { id, owner, name }
	}

	pub fn id(&self) -> &GithubProjectId {
		&self.id
	}

	pub fn owner(&self) -> &String {
		&self.owner
	}

	pub fn name(&self) -> &String {
		&self.name
	}
}
