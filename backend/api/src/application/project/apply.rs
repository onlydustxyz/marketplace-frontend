use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{
	AggregateRootRepository, Application, ApplicationId, DomainError, Event, Project, ProjectId,
	Publisher, UserId,
};
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;
use uuid::Uuid;

use crate::domain::Publishable;

#[derive(Constructor)]
pub struct Usecase {
	project_repository: AggregateRootRepository<Project>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn apply(
		&self,
		project_id: ProjectId,
		applicant_id: UserId,
	) -> Result<ApplicationId, DomainError> {
		let application_id = Uuid::new_v4().into();
		let project = self.project_repository.find_by_id(&project_id)?;

		project
			.apply(applicant_id)
			.map_err(|e| DomainError::InternalError(e.into()))?
			.into_iter()
			.map(Event::from)
			.chain(
				Application::create(application_id, project_id, applicant_id)
					.into_iter()
					.map(Event::from),
			)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(application_id)
	}
}
