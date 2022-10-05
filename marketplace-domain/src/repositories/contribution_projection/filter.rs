use crate::*;

pub enum Filter {
	Project(ProjectId),
	Contributor(ContributorId),
}

impl From<ProjectId> for Filter {
	fn from(id: ProjectId) -> Self {
		Self::Project(id)
	}
}

impl From<ContributorId> for Filter {
	fn from(id: ContributorId) -> Self {
		Self::Contributor(id)
	}
}
