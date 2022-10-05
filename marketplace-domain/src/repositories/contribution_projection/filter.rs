use crate::*;

pub enum Filter {
	Project(ProjectId),
	Contributor(ContributorAccountAddress),
}

impl From<ProjectId> for Filter {
	fn from(id: ProjectId) -> Self {
		Self::Project(id)
	}
}

impl From<ContributorAccountAddress> for Filter {
	fn from(address: ContributorAccountAddress) -> Self {
		Self::Contributor(address)
	}
}
