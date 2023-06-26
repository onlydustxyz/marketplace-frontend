use std::{collections::HashMap, sync::Arc};

use domain::{AggregateRootRepository, GithubUserId, Project, UserId};
use infrastructure::{
	amqp::{self, CommandPublisher},
	database::{ImmutableRepository, Repository},
	github, graphql,
};
use juniper_rocket_multipart_handler::temp_file::TempFile;
use presentation::http::guards::Claims;

use super::{Error, Result};
use crate::{
	application,
	domain::{ArePayoutSettingsValid, Permissions},
	infrastructure::{simple_storage, web3::ens},
	models::*,
};

pub struct Context {
	pub caller_permissions: Box<dyn Permissions>,
	caller_info: Option<Claims>,
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub cancel_payment_usecase: application::payment::cancel::Usecase,
	pub invoice_usecase: application::payment::invoice::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub update_budget_allocation_usecase: application::budget::allocate::Usecase,
	pub update_project_usecase: application::project::update::Usecase,
	pub link_github_repo_usecase: application::project::link_github_repo::Usecase,
	pub unlink_github_repo_usecase: application::project::unlink_github_repo::Usecase,
	pub create_sponsor_usecase: application::sponsor::create::Usecase,
	pub update_sponsor_usecase: application::sponsor::update::Usecase,
	pub add_sponsor_usecase: application::project::add_sponsor::Usecase,
	pub remove_sponsor_usecase: application::project::remove_sponsor::Usecase,
	pub remove_project_leader_usecase: application::project::remove_leader::Usecase,
	pub invite_project_leader_usecase: application::project::invite_leader::Usecase,
	pub accept_project_leader_invitation_usecase:
		application::project::accept_leader_invitation::Usecase,
	pub project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	pub update_user_payout_info_usecase: application::user::update_payout_info::Usecase,
	pub create_github_issue_usecase: application::github::create_issue::Usecase,
	pub ignored_github_issues_usecase: application::project::ignored_issues::Usecase,
	pub apply_to_project_usecase: application::project::apply::Usecase,
	pub accept_terms_and_conditions_usecase:
		application::user::accept_terms_and_conditions::Usecase,
	pub update_user_profile_info_usecase: application::user::update_profile_info::Usecase,
	pub ens: Arc<ens::Client>,
	pub files: HashMap<String, TempFile>,
}

impl Context {
	#[allow(clippy::too_many_arguments)]
	pub fn new(
		caller_permissions: Box<dyn Permissions>,
		caller_info: Option<Claims>,
		command_bus: Arc<CommandPublisher<amqp::Bus>>,
		project_repository: AggregateRootRepository<Project>,
		project_details_repository: Arc<dyn Repository<ProjectDetails>>,
		sponsor_repository: Arc<dyn Repository<Sponsor>>,
		project_sponsor_repository: Arc<dyn ImmutableRepository<ProjectsSponsor>>,
		pending_project_leader_invitations_repository: Arc<
			dyn ImmutableRepository<PendingProjectLeaderInvitation>,
		>,
		ignored_github_issues_repository: Arc<dyn ImmutableRepository<IgnoredGithubIssue>>,
		user_payout_info_repository: Arc<dyn Repository<UserPayoutInfo>>,
		user_profile_info_repository: Arc<dyn UserProfileInfoRepository>,
		contact_informations_repository: Arc<dyn ContactInformationsRepository>,
		terms_and_conditions_acceptance_repository: Arc<
			dyn Repository<TermsAndConditionsAcceptance>,
		>,
		graphql: Arc<graphql::Client>,
		github: Arc<github::Client>,
		ens: Arc<ens::Client>,
		simple_storage: Arc<simple_storage::Client>,
		bus: Arc<amqp::Bus>,
		files: Option<HashMap<String, TempFile>>,
	) -> Self {
		Self {
			caller_permissions,
			caller_info,
			request_payment_usecase: application::payment::request::Usecase::new(
				command_bus.to_owned(),
				project_repository.clone(),
			),
			process_payment_usecase: application::payment::process::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
				application::dusty_bot::close_issues::Usecase::new(github.clone(), bus.to_owned()),
			),
			cancel_payment_usecase: application::payment::cancel::Usecase::new(
				command_bus,
				project_repository.clone(),
			),
			invoice_usecase: application::payment::invoice::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
			),
			create_project_usecase: application::project::create::Usecase::new(
				bus.to_owned(),
				project_details_repository.clone(),
				simple_storage.clone(),
			),
			update_budget_allocation_usecase: application::budget::allocate::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
			),
			update_project_usecase: application::project::update::Usecase::new(
				project_details_repository.clone(),
				simple_storage.clone(),
			),
			link_github_repo_usecase: application::project::link_github_repo::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
				github,
			),
			unlink_github_repo_usecase: application::project::unlink_github_repo::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
			),
			create_sponsor_usecase: application::sponsor::create::Usecase::new(
				sponsor_repository.clone(),
				simple_storage.clone(),
			),
			update_sponsor_usecase: application::sponsor::update::Usecase::new(
				sponsor_repository,
				simple_storage.clone(),
			),
			add_sponsor_usecase: application::project::add_sponsor::Usecase::new(
				project_sponsor_repository.clone(),
			),
			remove_sponsor_usecase: application::project::remove_sponsor::Usecase::new(
				project_sponsor_repository,
			),
			remove_project_leader_usecase: application::project::remove_leader::Usecase::new(
				bus.to_owned(),
				project_repository.clone(),
			),
			invite_project_leader_usecase: application::project::invite_leader::Usecase::new(
				pending_project_leader_invitations_repository.clone(),
			),
			accept_project_leader_invitation_usecase:
				application::project::accept_leader_invitation::Usecase::new(
					bus.to_owned(),
					pending_project_leader_invitations_repository,
					project_repository.clone(),
				),
			project_details_repository,
			update_user_payout_info_usecase: application::user::update_payout_info::Usecase::new(
				user_payout_info_repository,
				ArePayoutSettingsValid::new(ens.clone()),
			),
			create_github_issue_usecase: application::github::create_issue::Usecase::new(
				project_repository.clone(),
				graphql,
			),
			ignored_github_issues_usecase: application::project::ignored_issues::Usecase::new(
				ignored_github_issues_repository,
			),
			apply_to_project_usecase: application::project::apply::Usecase::new(
				project_repository,
				bus,
			),
			accept_terms_and_conditions_usecase:
				application::user::accept_terms_and_conditions::Usecase::new(
					terms_and_conditions_acceptance_repository,
				),
			update_user_profile_info_usecase: application::user::update_profile_info::Usecase::new(
				user_profile_info_repository,
				contact_informations_repository,
				simple_storage,
			),
			ens,
			files: files.unwrap_or_default(),
		}
	}

	pub fn caller_info(&self) -> Result<CallerInfo> {
		let caller_info = self.caller_info.clone().ok_or(Error::NotAuthenticated)?;

		Ok(CallerInfo {
			user_id: caller_info.user_id.into(),
			github_user_id: caller_info.github_user_id.into(),
		})
	}
}

impl juniper::Context for Context {}

pub struct CallerInfo {
	pub user_id: UserId,
	pub github_user_id: GithubUserId,
}
