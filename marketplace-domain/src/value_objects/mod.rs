mod blockchain;
pub use blockchain::{ContractAddress, Network as BlockchainNetwork, TransactionHash};

mod github;
pub use github::{
	Issue as GithubIssue, IssueNumber as GithubIssueNumber, ProjectId as GithubProjectId,
	Repository as GithubRepo, User as GithubUser, UserId as GithubUserId,
};
