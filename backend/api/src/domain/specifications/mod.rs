mod payout_settings;
#[cfg_attr(test, mockall_double::double)]
pub use payout_settings::IsValid as ArePayoutSettingsValid;

mod github_repo_exists;
pub use github_repo_exists::Specification as GithubRepoExists;
