/**
 * This module contains all the repositories related to budget functionality.
 */
mod budget;

/**
 * This module contains all the custom error types used in the project.
 */
mod error;

/**
 * This module contains the repository for accessing GitHub issues.
 */
mod github_issues;

/**
 * This module contains the repository for accessing GitHub repository indexes.
 */
mod github_repo_indexes;

/**
 * This module contains the repository for accessing GitHub repositories.
 */
mod github_repos;

/**
 * This module contains the repository for accessing GitHub repository contributors.
 */
mod github_repos_contributors;

/**
 * This module contains the repository for accessing GitHub user indexes.
 */
mod github_user_indexes;

/**
 * This module contains the repository for accessing GitHub users.
 */
mod github_users;

/**
 * This module contains the indexer for synchronizing GitHub repositories with local data store.
 */
mod indexer;

/**
 * This module contains the repository for accessing payment records.
 */
mod payment;

/**
 * This module contains the repository for accessing payment requests.
 */
mod payment_request;

/**
 * This module contains the repository for accessing projects.
 */
mod project;

/**
 * This module contains the repository for accessing project GitHub repositories.
 */
mod project_github_repos;

/**
 * This module contains the repository for accessing project leads.
 */
mod project_lead;

/**
 * This module contains the repository for accessing work items.
 */
mod work_item;

/**
 * Exports all the repositories for use in other modules.
 */
pub use budget::Repository as BudgetRepository;
pub use github_issues::Repository as GithubIssuesRepository;
pub use github_repos::Repository as GithubReposRepository;
pub use github_repos_contributors::Repository as GithubReposContributorsRepository;
pub use github_users::Repository as GithubUsersRepository;
pub use payment::Repository as PaymentRepository;
pub use payment_request::Repository as PaymentRequestRepository;
pub use project::Repository as ProjectRepository;
pub use project_github_repos::Repository as ProjectGithubReposRepository;
pub use project_lead::Repository as ProjectLeadRepository;
pub use work_item::Repository as WorkItemRepository;