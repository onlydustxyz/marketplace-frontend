use std::{convert::TryFrom, sync::Arc};

use anyhow::Result;
use async_trait::async_trait;
use derive_new::new;
use domain::{
	ApplicationEvent, BudgetEvent, Event, EventListener, PaymentEvent, PaymentWorkItem,
	ProjectEvent, SubscriberCallbackError,
};
use infrastructure::dbclient::{ImmutableRepository, Repository};
use rust_decimal::Decimal;
use tracing::instrument;

use crate::models::*;

#[allow(clippy::too_many_arguments)]
#[derive(new, Clone)]
pub struct Projector {
	project_repository: Arc<dyn ImmutableRepository<Project>>,
	project_lead_repository: Arc<dyn ImmutableRepository<ProjectLead>>,
	project_github_repos_repository: Arc<dyn ImmutableRepository<ProjectGithubRepo>>,
	projects_contributors_repository: Arc<dyn ProjectsContributorRepository>,
	projects_pending_contributors_repository: Arc<dyn ProjectsPendingContributorRepository>,
	project_budgets_repository: Arc<dyn ImmutableRepository<ProjectsBudget>>,
	applications_repository: Arc<dyn Repository<Application>>,
	budget_repository: Arc<dyn Repository<Budget>>,
	payment_request_repository: Arc<dyn Repository<PaymentRequest>>,
	payment_repository: Arc<dyn Repository<Payment>>,
	work_item_repository: Arc<dyn WorkItemRepository>,
	projects_rewarded_users_repository: Arc<dyn ProjectsRewardedUserRepository>,
	// TODO: replace the repositories below by API call to indexer in another projector
	github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
	github_user_index_repository: Arc<dyn GithubUserIndexRepository>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Application(event) => match event {
				ApplicationEvent::Received {
					id,
					project_id,
					applicant_id,
					received_at,
				} => {
					self.applications_repository.try_insert(Application {
						id,
						received_at,
						project_id,
						applicant_id,
					})?;
				},
			},
			Event::Budget(event) => match event {
				BudgetEvent::Created { id, currency } => {
					self.budget_repository.upsert(Budget {
						id,
						initial_amount: Decimal::ZERO,
						remaining_amount: Decimal::ZERO,
						currency: currency.try_into()?,
					})?;
				},
				BudgetEvent::Allocated { id, amount, .. } => {
					let mut budget = self.budget_repository.find_by_id(id)?;
					budget.remaining_amount += amount;
					budget.initial_amount += amount;
					self.budget_repository.update(budget)?;
				},
				BudgetEvent::Spent { id, amount } => {
					let mut budget = self.budget_repository.find_by_id(id)?;
					budget.remaining_amount -= amount;
					self.budget_repository.update(budget)?;
				},
			},
			Event::Payment(event) => match event {
				PaymentEvent::Requested {
					id: payment_id,
					project_id,
					requestor_id,
					recipient_id,
					amount,
					reason,
					duration_worked,
					requested_at,
				} => {
					self.payment_request_repository.upsert(PaymentRequest {
						id: payment_id,
						project_id,
						requestor_id,
						recipient_id,
						amount: *amount.amount(),
						currency: amount.currency().try_into()?,
						requested_at,
						invoice_received_at: None,
						hours_worked: i32::try_from(duration_worked.num_hours()).unwrap_or(0),
					})?;

					reason.work_items.into_iter().try_for_each(
						|work_item| -> Result<(), SubscriberCallbackError> {
							let repo_id = match work_item {
								PaymentWorkItem::Issue { repo_id, .. }
								| PaymentWorkItem::CodeReview { repo_id, .. }
								| PaymentWorkItem::PullRequest { repo_id, .. } => repo_id,
							};

							self.work_item_repository.try_insert(
								(project_id, payment_id, recipient_id, work_item).into(),
							)?;

							self.github_repo_index_repository.start_indexing(repo_id)?;
							Ok(())
						},
					)?;

					self.github_user_index_repository.try_insert(GithubUserIndex {
						user_id: recipient_id,
						..Default::default()
					})?;

					self.projects_rewarded_users_repository
						.increase_user_reward_count_for_project(&project_id, &recipient_id)?;
				},
				PaymentEvent::Cancelled { id: payment_id } => {
					let payment_request = self.payment_request_repository.find_by_id(payment_id)?;
					self.payment_request_repository.delete(payment_id)?;
					self.work_item_repository.delete_by_payment_id(payment_id)?;

					self.projects_rewarded_users_repository
						.decrease_user_reward_count_for_project(
							&payment_request.project_id,
							&payment_request.recipient_id,
						)?;
				},
				PaymentEvent::Processed {
					id: payment_id,
					receipt_id,
					amount,
					receipt,
					processed_at,
				} => {
					self.payment_repository.upsert(Payment {
						id: receipt_id,
						amount: *amount.amount(),
						currency_code: amount.currency().to_string(),
						receipt: serde_json::to_value(receipt)
							.map_err(|e| SubscriberCallbackError::Discard(e.into()))?,
						request_id: payment_id,
						processed_at,
					})?;
				},
				PaymentEvent::InvoiceReceived {
					id: payment_id,
					received_at,
				} => {
					let mut payment_request =
						self.payment_request_repository.find_by_id(payment_id)?;
					payment_request.invoice_received_at = Some(received_at);
					self.payment_request_repository.update(payment_request)?;
				},
				PaymentEvent::InvoiceRejected { id: payment_id } => {
					let mut payment_request =
						self.payment_request_repository.find_by_id(payment_id)?;
					payment_request.invoice_received_at = None;
					self.payment_request_repository.update(payment_request)?;
				},
			},
			Event::Project(event) => match event {
				ProjectEvent::Created { id } => {
					self.project_repository.try_insert(Project { id })?;
				},
				ProjectEvent::LeaderAssigned {
					id: project_id,
					leader_id,
					assigned_at,
				} => {
					self.project_lead_repository.try_insert(ProjectLead {
						project_id,
						user_id: leader_id,
						assigned_at,
					})?;
				},
				ProjectEvent::LeaderUnassigned { id, leader_id } => {
					self.project_lead_repository.delete((id, leader_id))?;
				},
				ProjectEvent::BudgetLinked { id, budget_id, .. } => {
					self.project_budgets_repository.try_insert(ProjectsBudget {
						project_id: id,
						budget_id,
					})?;
				},
				ProjectEvent::GithubRepoLinked {
					id: project_id,
					github_repo_id,
				} => {
					self.project_github_repos_repository.try_insert(ProjectGithubRepo {
						project_id,
						github_repo_id,
					})?;
					self.github_repo_index_repository.start_indexing(github_repo_id)?;
					self.projects_contributors_repository
						.refresh_project_contributor_list(&project_id)?;
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(&project_id)?;
				},
				ProjectEvent::GithubRepoUnlinked {
					id: project_id,
					github_repo_id,
				} => {
					self.project_github_repos_repository.delete((project_id, github_repo_id))?;
					self.projects_contributors_repository
						.refresh_project_contributor_list(&project_id)?;
					self.projects_pending_contributors_repository
						.refresh_project_pending_contributor_list(&project_id)?;
				},
				ProjectEvent::Applied { .. } => (),
			},
		}

		Ok(())
	}
}
