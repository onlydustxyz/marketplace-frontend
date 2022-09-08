mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

mod contribution_projection;
pub use contribution_projection::{
	Error as ContributionProjectionRepositoryError,
	MockRepository as MockContributionProjectionRepository,
	Repository as ContributionProjectionRepository,
};

mod contact_information;
pub use contact_information::{
	Error as ContactInformationRepositoryError, MockRepository as MockContactInformationRepository,
	Repository as ContactInformationRepository,
};

mod application_projection;
pub use application_projection::{
	Error as ApplicationProjectionRepositoryError,
	MockRepository as MockApplicationProjectionRepository,
	Repository as ApplicationProjectionRepository,
};

mod project_member_projection;
pub use project_member_projection::{
	Error as ProjectMemberProjectionRepositoryError,
	Repository as ProjectMemberProjectionRepository,
};

mod project_projection;
pub use project_projection::{
	Error as ProjectProjectionRepositoryError, Repository as ProjectProjectionRepository,
};

mod contributor_projection;
pub use contributor_projection::{
	Error as ContributorProjectionRepositoryError, Repository as ContributorProjectionRepository,
};

#[cfg(test)]
pub use project_projection::MockRepository as MockProjectProjectionRepository;

#[cfg(test)]
pub use project_member_projection::MockRepository as MockProjectMemberProjectionRepository;

#[cfg(test)]
pub use contributor_projection::MockRepository as MockContributorProjectionRepository;
