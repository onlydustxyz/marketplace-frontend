mod crm_github_repo;
#[cfg_attr(test, mockall_double::double)]
pub use crm_github_repo::Repository as GithubRepoRepository;
