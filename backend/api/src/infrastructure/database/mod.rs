/// Provides a repository for retrieving project details.
mod project_details;

#[cfg_attr(test, mockall_double::double)]
/// Alias for the `Repository` trait in `project_details` module.
pub use project_details::Repository as ProjectDetailsRepository;

/// Provides a repository for retrieving user information.
mod user_info;

#[cfg_attr(test, mockall_double::double)]
/// Alias for the `Repository` trait in `user_info` module.
pub use user_info::Repository as UserInfoRepository;

/// Provides a repository for managing pending project leader invitations.
mod pending_project_leader_invitations;

/// Alias for the `Repository` trait in `pending_project_leader_invitations` module.
pub use pending_project_leader_invitations::Repository as PendingProjectLeaderInvitationsRepository;

/// Provides a repository for managing project sponsors.
mod project_sponsor;

/// Alias for the `Repository` trait in `project_sponsor` module.
pub use project_sponsor::Repository as ProjectSponsorRepository;

/// Provides a repository for managing sponsors.
mod sponsor;

#[cfg_attr(test, mockall_double::double)]
/// Alias for the `Repository` trait in `sponsor` module.
pub use sponsor::Repository as SponsorRepository;

/// Provides a repository for managing ignored GitHub issues.
mod ignored_github_issues;

/// Alias for the `Repository` trait in `ignored_github_issues` module.
pub use ignored_github_issues::Repository as IgnoredGithubIssuesRepository;