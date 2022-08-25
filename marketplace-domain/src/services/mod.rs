mod contact_information;
pub use contact_information::{
	ContactInformationService as ContactInformationServiceImplementation,
	MockService as MockContactInformationService, Service as ContactInformationService,
};

mod contribution;
pub use contribution::{
	ContributionService as ContributionServiceImplementation, Error as ContributionServiceError,
	MockService as MockContributionService, Service as ContributionService,
};

mod onchain_contribution;
pub use onchain_contribution::{
	Error as OnchainContributionServiceError, MockService as MockOnchainContributionService,
	Service as OnchainContributionService,
};

mod application;
pub use application::{
	Error as ApplicationServiceError, MockService as MockApplicationService,
	Service as ApplicationService,
};

mod uuid;
pub use self::uuid::{
	MockService as MockUuidGenerator, RandomUuidGenerator, Service as UuidGenerator,
};
