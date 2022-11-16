mod github_client;
pub use github_client::{
	Error as GithubClientError, GithubClient, User as GithubUser, UserId as GithubUserId,
};

#[cfg(test)]
pub use github_client::MockGithubClient;
