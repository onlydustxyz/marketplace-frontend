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

mod contributor_projection;
pub use contributor_projection::{
	Error as ContributorProjectionRepositoryError, Repository as ContributorProjectionRepository,
};

#[cfg(test)]
pub use project_member_projection::MockRepository as MockProjectMemberProjectionRepository;

#[cfg(test)]
pub use contributor_projection::MockRepository as MockContributorProjectionRepository;

#[cfg(test)]
pub use lead_contributor_projection::MockRepository as MockLeadContributorProjectionRepository;
