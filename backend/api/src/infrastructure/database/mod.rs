mod project_details;
pub use project_details::ProjectDetails;
#[cfg_attr(test, mockall_double::double)]
pub use project_details::Repository as ProjectDetailsRepository;

mod user_payout_info;
#[cfg_attr(test, mockall_double::double)]
pub use user_payout_info::Repository as UserPayoutInfoRepository;

mod user_profile_info;
pub use user_profile_info::Repository as UserProfileInfoRepository;

mod terms_and_conditions_acceptance;
pub use terms_and_conditions_acceptance::Repository as TermsAndConditionsAcceptanceRepository;

mod pending_project_leader_invitations;
pub use pending_project_leader_invitations::Repository as PendingProjectLeaderInvitationsRepository;

mod project_sponsor;
pub use project_sponsor::Repository as ProjectSponsorRepository;

mod sponsor;
#[cfg_attr(test, mockall_double::double)]
pub use sponsor::Repository as SponsorRepository;

mod ignored_github_issues;
pub use ignored_github_issues::Repository as IgnoredGithubIssuesRepository;

mod contact_informations;
pub use contact_informations::Repository as ContactInformationsRepository;
