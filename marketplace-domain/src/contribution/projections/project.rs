use crate::GithubProjectId;

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Projection {
	id: GithubProjectId,
	owner: String,
	name: String,
}

impl crate::Projection for Projection {}

impl Projection {
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
