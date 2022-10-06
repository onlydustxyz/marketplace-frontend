#[cfg(test)]
mod tests;

use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;

pub struct LeadContributorProjector {
	lead_contributor_projection_repository: Arc<dyn LeadContributorProjectionRepository>,
}

impl LeadContributorProjector {
	pub fn new(
		lead_contributor_projection_repository: Arc<dyn LeadContributorProjectionRepository>,
	) -> Self {
		Self {
			lead_contributor_projection_repository,
		}
	}

	fn on_lead_contributor_added(
		&self,
		project_id: &ProjectId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		self.lead_contributor_projection_repository
			.insert(LeadContributorProjection::new(
				*project_id,
				contributor_account_address.clone(),
			))
	}

	fn on_lead_contributor_removed(
		&self,
		project_id: &ProjectId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		self.lead_contributor_projection_repository
			.delete(project_id, contributor_account_address)
	}
}

#[async_trait]
impl EventListener for LeadContributorProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Project(project_event) => match project_event {
				ProjectEvent::LeadContributorAdded {
					project_id,
					contributor_account,
				} => self.on_lead_contributor_added(project_id, contributor_account),
				ProjectEvent::LeadContributorRemoved {
					project_id,
					contributor_account,
				} => self.on_lead_contributor_removed(project_id, contributor_account),
				ProjectEvent::MemberAdded { .. } | ProjectEvent::MemberRemoved { .. } => return,
			},
			Event::Contribution(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Failed while projecting ProjectEvent {event}: {}", error);
		}
	}
}
