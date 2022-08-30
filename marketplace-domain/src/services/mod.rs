mod contact_information;
pub use contact_information::{
	ContactInformationService as ContactInformationServiceImplementation,
	MockService as MockContactInformationService, Service as ContactInformationService,
};

mod onchain_contribution;
pub use onchain_contribution::{
	Error as OnchainContributionServiceError, MockService as MockOnchainContributionService,
	Service as OnchainContributionService,
};

mod uuid;
pub use self::uuid::{
	MockService as MockUuidGenerator, RandomUuidGenerator, Service as UuidGenerator,
};
