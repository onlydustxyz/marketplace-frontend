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

mod github_client;
pub use github_client::{Error as GithubClientError, GithubClient, MockGithubClient};

mod contributor;
pub use contributor::{
	Error as ContributorServiceError, MockService as MockContributorService,
	Service as ContributorService,
};
