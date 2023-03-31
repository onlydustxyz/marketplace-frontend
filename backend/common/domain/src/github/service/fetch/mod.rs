mod issue;
pub use issue::Service as IssueService;

mod repo;
pub use repo::Service as RepoService;

mod user;
pub use user::Service as UserService;

use super::Result;

pub trait Service: RepoService + UserService + IssueService {}

impl<S: RepoService + UserService + IssueService> Service for S {}
