/// This module contains the `Budget` struct which is used to represent a budget for a project.
mod budget;

/// This module contains the `GithubIssue` struct which is used to represent an issue in a Github repository.
mod github_issues;

/// This module contains the `GithubRepo` struct which is used to represent a Github repository.
mod github_repos;

/// This module contains the `GithubUser` struct which is used to represent a user on Github.
mod github_users;

/// This module contains the `Payment` struct which is used to represent a payment.
mod payment;

/// This module contains the `PaymentRequest` struct which is used to represent a payment request.
mod payment_request;

/// This module contains the `Project` struct which is used to represent a project.
mod project;

/// This module contains the `WorkItem` struct which is used to represent a work item for a project.
mod work_item;

/// Re-exports the structs from the various sub-modules for convenience.
pub use budget::Budget;
pub use github_issues::GithubIssue;
pub use github_repos::GithubRepo;
pub use github_users::GithubUser;
pub use payment::Payment;
pub use payment_request::PaymentRequest;
pub use project::Project;
pub use work_item::WorkItem;