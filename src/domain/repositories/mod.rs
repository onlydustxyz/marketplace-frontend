mod project;
pub use project::{Error as ProjectRepositoryError, Repository as ProjectRepository};

mod contribution;
pub use contribution::{
	Error as ContributionRepositoryError, MockRepository as MockContributionRepository,
	Repository as ContributionRepository,
};

mod contributor;
pub use contributor::{
	Error as ContributorRepositoryError, MockRepository as MockContributorRepository,
	Repository as ContributorRepository,
};

mod application;
pub use application::{
	Error as ApplicationRepositoryError, MockRepository as MockApplicationRepository,
	Repository as ApplicationRepository,
};
