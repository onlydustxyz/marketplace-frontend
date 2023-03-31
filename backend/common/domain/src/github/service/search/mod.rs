use super::Result;

mod issue;
pub use issue::Service as IssueService;

mod user;
pub use user::Service as UserService;

pub trait Service: UserService + IssueService {}

impl<S: UserService + IssueService> Service for S {}
