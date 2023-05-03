mod budget;
mod crm;
mod github_issues;
mod github_repo_details;
mod github_repo_indexes;
mod github_users;
mod payment;
mod payment_request;
#[allow(clippy::extra_unused_lifetimes)]
mod project;
mod project_github_repo_details;
mod project_lead;
mod work_item;

pub use budget::Repository as BudgetRepository;
pub use crm::GithubRepoRepository as CrmGithubRepoRepository;
pub use github_issues::Repository as GithubIssuesRepository;
pub use github_repo_details::Repository as GithubRepoDetailsRepository;
pub use github_repo_indexes::Repository as GithubRepoIndexRepository;
pub use github_users::Repository as GithubUsersRepository;
pub use payment::Repository as PaymentRepository;
pub use payment_request::Repository as PaymentRequestRepository;
pub use project::Repository as ProjectRepository;
pub use project_github_repo_details::Repository as ProjectGithubRepoDetailsRepository;
pub use project_lead::Repository as ProjectLeadRepository;
pub use work_item::Repository as WorkItemRepository;
