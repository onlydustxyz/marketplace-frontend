mod contribution;
mod onchain_contribution;
pub use contribution::{
	ContributionService as ContributionServiceImplementation, Error as ContributionServiceError,
	MockService as MockContributionService, Service as ContributionService,
};
pub use onchain_contribution::{
	Error as OnchainContributionServiceError, MockService as MockOnchainContributionService,
	Service as OnchainContributionService,
};

mod application;
pub use application::{Error as ApplicationServiceError, Service as ApplicationService};

mod uuid;
pub use self::uuid::{
	MockService as MockUuidGenerator, RandomUuidGenerator, Service as UuidGenerator,
};
