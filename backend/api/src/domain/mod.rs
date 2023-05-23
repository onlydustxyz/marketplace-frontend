/// This module contains types and traits related to publishing Dusty projects.
pub mod publishable;
pub use publishable::Publishable;

/// This module contains types and traits related to permissions for Dusty project leaders and contributors.
pub mod permissions;
pub use permissions::Permissions;

/// This module contains types related to the details of a Dusty project.
mod project_details;
pub use project_details::ProjectDetails;

/// This module contains types related to user information in Dusty.
#[allow(clippy::extra_unused_lifetimes)]
pub mod user_info;
pub use user_info::UserInfo;

/// This module contains types related to various project specifications in Dusty.
mod specifications;
#[cfg(test)]
pub use specifications::MockGithubRepoExists;
pub use specifications::{ArePayoutSettingsValid, GithubRepoExists};

/// This module contains services used in Dusty, such as the Github and ImageStore services.
mod services;
#[cfg(test)]
pub use services::MockImageStoreService;
pub use services::{
	DustyBotAsyncService, DustyBotService, GithubService, ImageStoreService, ImageStoreServiceError,
};

/// This module contains types related to pending project leader invitations in Dusty.
mod pending_project_leader_invitation;
pub use pending_project_leader_invitation::{
	Id as PendingProjectLeaderInvitationId, PendingProjectLeaderInvitation,
};

/// This module contains types related to sponsors in Dusty.
mod sponsor;
pub use sponsor::{Id as SponsorId, Sponsor};