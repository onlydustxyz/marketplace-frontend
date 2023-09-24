mod ens;
#[cfg_attr(test, mockall_double::double)]
pub use ens::IsValid as IsEnsValid;

mod github_repo_exists;
#[cfg(test)]
pub use github_repo_exists::MockSpecification as MockGithubRepoExists;
pub use github_repo_exists::Specification as GithubRepoExists;
