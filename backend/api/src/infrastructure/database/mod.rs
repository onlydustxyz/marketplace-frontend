mod project_details;
#[cfg_attr(test, mockall_double::double)]
pub use project_details::Repository as ProjectDetailsRepository;

mod user_info;
#[cfg_attr(test, mockall_double::double)]
pub use user_info::Repository as UserInfoRepository;

mod pending_project_leader_invitations;
pub use pending_project_leader_invitations::Repository as PendingProjectLeaderInvitationsRepository;

mod project_sponsor;
pub use project_sponsor::Repository as ProjectSponsorRepository;

mod sponsor;
#[cfg_attr(test, mockall_double::double)]
pub use sponsor::Repository as SponsorRepository;
