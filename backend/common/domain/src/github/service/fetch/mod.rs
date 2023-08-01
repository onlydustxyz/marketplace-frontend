mod issue;
pub use issue::Service as IssueService;

mod pull_request;
pub use pull_request::Service as PullRequestService;

mod repo;
pub use repo::Service as RepoService;

mod user;
pub use user::Service as UserService;

use super::Result;

pub trait Service: RepoService + UserService + IssueService + PullRequestService {}

impl<S: RepoService + UserService + IssueService + PullRequestService> Service for S {}
