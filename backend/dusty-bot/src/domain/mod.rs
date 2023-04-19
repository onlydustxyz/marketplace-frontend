mod github;
pub use github::{
	Error as GithubServiceError, Result as GithubServiceResult, Service as GithubService,
};
