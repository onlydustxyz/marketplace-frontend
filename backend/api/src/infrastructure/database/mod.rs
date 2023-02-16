mod project_details;
pub use project_details::Repository as ProjectDetailsRepository;

mod user_info;
#[cfg_attr(test, mockall_double::double)]
pub use user_info::Repository as UserInfoRepository;

mod pending_project_leader_invitations;
pub use pending_project_leader_invitations::Repository as PendingProjectLeaderInvitationsRepository;

mod project_github_repo;
pub use project_github_repo::Repository as ProjectGithubRepoRepository;

mod github_repo;
pub use github_repo::Repository as GithubRepoRepository;
