mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

mod github_contribution_projection;
pub use github_contribution_projection::{
	Error as ContributionProjectionRepositoryError,
	MockRepository as MockContributionProjectionRepository,
	Repository as ContributionProjectionRepository,
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

mod lead_contributor_projection;
pub use lead_contributor_projection::{
	Error as LeadContributorProjectionRepositoryError,
	Repository as LeadContributorProjectionRepository,
};

mod github_project_projection;
pub use github_project_projection::{
	Error as ProjectProjectionRepositoryError, Repository as ProjectProjectionRepository,
};

mod contributor_projection;
pub use contributor_projection::{
	Error as ContributorProjectionRepositoryError, Repository as ContributorProjectionRepository,
};

#[cfg(test)]
pub use github_project_projection::MockRepository as MockProjectProjectionRepository;

#[cfg(test)]
pub use project_member_projection::MockRepository as MockProjectMemberProjectionRepository;

#[cfg(test)]
pub use contributor_projection::MockRepository as MockContributorProjectionRepository;

#[cfg(test)]
pub use lead_contributor_projection::MockRepository as MockLeadContributorProjectionRepository;
