use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;

pub struct ApplicationProjector {
	application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ApplicationProjector {
	pub fn new(
		application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			application_projection_repository,
			uuid_generator,
		}
	}

	fn on_applied(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let previous_application = self
			.application_projection_repository
			.find_by_contribution_and_contributor(contribution_id, contributor_id)?;
		match previous_application {
			Some(application) =>
				self.application_projection_repository.update(application.into_pending()),
			None => {
				let application = ApplicationProjection::new(
					self.uuid_generator.new_uuid().into(),
					contribution_id.clone(),
					contributor_id.clone(),
				);
				self.application_projection_repository.create(application)
			},
		}
	}

	fn on_application_refused(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let previous_application = self
			.application_projection_repository
			.find_by_contribution_and_contributor(contribution_id, contributor_id)?;
		match previous_application {
			Some(application) =>
				self.application_projection_repository.update(application.into_refused()),
			None => {
				let application = ApplicationProjection::new(
					self.uuid_generator.new_uuid().into(),
					contribution_id.clone(),
					contributor_id.clone(),
				)
				.into_refused();
				self.application_projection_repository.create(application)
			},
		}
	}

	fn on_assigned(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		self.application_projection_repository
			.for_a_contribution_set_one_to_a_status_and_all_others_to_another(
				contribution_id,
				contributor_id,
				ApplicationStatus::Accepted,
				ApplicationStatus::Refused,
			)
	}

	fn on_unassigned(
		&self,
		contribution_id: &ContributionId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		self.application_projection_repository
			.for_a_contribution_set_all_status(contribution_id, ApplicationStatus::Pending)
	}
}

#[async_trait]
impl EventListener for ApplicationProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Applied {
					id: contribution_id,
					contributor_id,
				} => self.on_applied(contribution_id, contributor_id),
				ContributionEvent::ApplicationRefused {
					id: contribution_id,
					contributor_id,
				} => self.on_application_refused(contribution_id, contributor_id),
				ContributionEvent::Assigned {
					id: contribution_id,
					contributor_id,
				}
				| ContributionEvent::Claimed {
					id: contribution_id,
					contributor_id,
				} => self.on_assigned(contribution_id, contributor_id),
				ContributionEvent::Unassigned {
					id: contribution_id,
				} => self.on_unassigned(contribution_id),
				ContributionEvent::Created { .. } | ContributionEvent::Validated { .. } => return,
			},
			Event::Project(_) => return,
		};

		if let Err(error) = result {
			error!("Failed to project event {event}: {}", error.to_string());
		}
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use super::*;
	use mockall::{predicate::eq, Sequence};
	use rstest::{fixture, rstest};

	#[fixture]
	fn application_projection_repository() -> MockApplicationProjectionRepository {
		MockApplicationProjectionRepository::new()
	}

	#[fixture]
	fn uuid_generator() -> MockUuidGenerator {
		MockUuidGenerator::new()
	}

	#[fixture]
	fn random_uuid_generator() -> Box<dyn UuidGenerator> {
		Box::new(RandomUuidGenerator {})
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		ContributionId::from_str("0x123").unwrap()
	}

	#[fixture]
	fn application_id() -> ApplicationId {
		uuid::Uuid::from_str("03b4715c-d237-422c-8689-370e4c257f90").unwrap().into()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		ContributorId::from_str("0x456").unwrap()
	}

	#[rstest]
	async fn contribution_applied_with_same_contributor_updates_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		let previous_application = ApplicationProjection::default();

		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().never();
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(eq(contribution_id.clone()), eq(contributor_id.clone()))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(Some(previous_application.clone())));
		application_projection_repository
			.expect_update()
			.withf(|application| &ApplicationStatus::Pending == application.status())
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector
			.on_event(&Event::Contribution(ContributionEvent::Applied {
				id: contribution_id,
				contributor_id,
			}))
			.await;
	}

	#[rstest]
	async fn contribution_applied_creates_an_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		application_id: ApplicationId,
		contributor_id: ContributorId,
	) {
		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().returning(move || application_id.into());
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(eq(contribution_id.clone()), eq(contributor_id.clone()))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(None));
		application_projection_repository.expect_update().never();
		application_projection_repository
			.expect_create()
			.with(eq(ApplicationProjection::new(
				application_id,
				contribution_id.clone(),
				contributor_id.clone(),
			)))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector
			.on_event(&Event::Contribution(ContributionEvent::Applied {
				id: contribution_id,
				contributor_id,
			}))
			.await;
	}

	#[rstest]
	async fn contribution_application_refused_updates_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		let previous_application = ApplicationProjection::default();

		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().never();
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(eq(contribution_id.clone()), eq(contributor_id.clone()))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(Some(previous_application.clone())));
		application_projection_repository
			.expect_update()
			.withf(|application| &ApplicationStatus::Refused == application.status())
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector
			.on_event(&Event::Contribution(
				ContributionEvent::ApplicationRefused {
					id: contribution_id,
					contributor_id,
				},
			))
			.await;
	}

	#[rstest]
	async fn contribution_application_refused_creates_an_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		application_id: ApplicationId,
		contributor_id: ContributorId,
	) {
		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().returning(move || application_id.into());
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(eq(contribution_id.clone()), eq(contributor_id.clone()))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(None));
		application_projection_repository.expect_update().never();
		application_projection_repository
			.expect_create()
			.with(eq(ApplicationProjection::new(
				application_id,
				contribution_id.clone(),
				contributor_id.clone(),
			)
			.into_refused()))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector
			.on_event(&Event::Contribution(
				ContributionEvent::ApplicationRefused {
					id: contribution_id,
					contributor_id,
				},
			))
			.await;
	}
}
