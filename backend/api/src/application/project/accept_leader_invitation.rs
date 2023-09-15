use std::sync::Arc;

use anyhow::{anyhow, Result};
use domain::{
	Aggregate, AggregateRepository, DomainError, Event, GithubUserId, Project, Publisher, UserId,
};
use infrastructure::{amqp::UniqueMessage, database::ImmutableRepository};
use tracing::instrument;

use crate::{domain::Publishable, models::*};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	invitations_repository: Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
	project_repository: AggregateRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		invitations_repository: Arc<dyn ImmutableRepository<PendingProjectLeaderInvitation>>,
		project_repository: AggregateRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			invitations_repository,
			project_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn accept_leader_invitation(
		&self,
		invitation_id: PendingProjectLeaderInvitationId,
		user_id: UserId,
		github_user_id: GithubUserId,
	) -> Result<(), DomainError> {
		let invitation = self.invitations_repository.find_by_id(invitation_id)?;
		if github_user_id != invitation.github_user_id {
			return Err(DomainError::InvalidInputs(anyhow!(
				"GithubUserId {github_user_id} does not match the invitation {invitation_id}"
			)));
		}

		let project = self.project_repository.find_by_id(&invitation.project_id)?;

		project
			.assign_leader(user_id)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.pending_events()
			.clone()
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		self.invitations_repository.delete(invitation_id)?;
		Ok(())
	}
}
