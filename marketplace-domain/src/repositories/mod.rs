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

mod project_projection;
pub use project_projection::{
	Error as ProjectProjectionRepositoryError, Repository as ProjectProjectionRepository,
};

#[cfg(test)]
pub use project_projection::MockRepository as MockProjectProjectionRepository;
