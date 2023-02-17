mod payout_settings;
#[cfg_attr(test, mockall_double::double)]
pub use payout_settings::IsValid as ArePayoutSettingsValid;

mod github_repo_exists;
#[cfg(test)]
pub use github_repo_exists::MockSpecification as MockGithubRepoExists;
pub use github_repo_exists::Specification as GithubRepoExists;
