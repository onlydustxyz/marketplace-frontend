mod contact_informations;
pub use contact_informations::{ContactInformation, Repository as ContactInformationsRepository};

mod ignored_github_issues;
pub use ignored_github_issues::IgnoredGithubIssue;

mod pending_project_leader_invitations;
pub use pending_project_leader_invitations::{
	Id as PendingProjectLeaderInvitationId, PendingProjectLeaderInvitation,
};

mod project_details;
pub use project_details::ProjectDetails;

mod projects_sponsors;
pub use projects_sponsors::ProjectsSponsor;

mod sponsor;
#[cfg_attr(test, mockall_double::double)]
pub use sponsor::Repository as SponsorRepository;
pub use sponsor::{Id as SponsorId, Sponsor};

mod terms_and_conditions_acceptance;
pub use terms_and_conditions_acceptance::{
	Repository as TermsAndConditionsAcceptanceRepository, TermsAndConditionsAcceptance,
};

mod user_payout_info;
#[cfg_attr(test, mockall_double::double)]
pub use user_payout_info::Repository as UserPayoutInfoRepository;
pub use user_payout_info::{
	BankAddress, CompanyIdentity, Identity, Location, PayoutSettings, PersonIdentity,
	UserPayoutInfo,
};

mod user_profile_info;
pub use user_profile_info::{Repository as UserProfileInfoRepository, UserProfileInfo};
