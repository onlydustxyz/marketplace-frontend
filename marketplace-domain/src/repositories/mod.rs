mod project_lead;
pub use project_lead::{Error as ProjectLeadRepositoryError, Repository as ProjectLeadRepository};

mod contributor_projection;
pub use contributor_projection::{
	Error as ContributorProjectionRepositoryError, Repository as ContributorProjectionRepository,
};

mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

#[cfg(test)]
pub use contributor_projection::MockRepository as MockContributorProjectionRepository;

#[cfg(test)]
pub use project_lead::MockRepository as MockProjectLeadRepository;
