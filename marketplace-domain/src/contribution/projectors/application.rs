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
					contribution_id.to_owned(),
					contributor_id.to_owned(),
				);
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
impl Projector<ApplicationProjection> for ApplicationProjector {
	async fn project(&self, event: &ContributionEvent) {
		let result = match event {
			ContributionEvent::Applied {
				id: contribution_id,
				contributor_id,
			} => self.on_applied(contribution_id, contributor_id),
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
			ContributionEvent::Created { .. } | ContributionEvent::Validated { .. } => Ok(()),
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
	fn contributor_1_id() -> ContributorId {
		ContributorId::from_str("0x456").unwrap()
	}

	#[fixture]
	fn contributor_2_id() -> ContributorId {
		ContributorId::from_str("0x457").unwrap()
	}

	#[fixture]
	fn contributor_3_id() -> ContributorId {
		ContributorId::from_str("0x458").unwrap()
	}

	#[rstest]
	async fn contribution_applied_with_same_contributor_updates_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_1_id: ContributorId,
	) {
		let previous_application = ApplicationProjection::default();

		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().never();
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(
				eq(contribution_id.to_owned()),
				eq(contributor_1_id.to_owned()),
			)
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(Some(previous_application.to_owned())));
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
			.project(&ContributionEvent::Applied {
				id: contribution_id,
				contributor_id: contributor_1_id,
			})
			.await;
	}

	#[rstest]
	async fn contribution_applied_creates_an_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		application_id: ApplicationId,
		contributor_1_id: ContributorId,
	) {
		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().returning(move || application_id.into());
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(
				eq(contribution_id.to_owned()),
				eq(contributor_1_id.to_owned()),
			)
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(None));
		application_projection_repository.expect_update().never();
		application_projection_repository
			.expect_create()
			.with(eq(ApplicationProjection::new(
				application_id.to_owned(),
				contribution_id.to_owned(),
				contributor_1_id.to_owned(),
			)))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector
			.project(&ContributionEvent::Applied {
				id: contribution_id,
				contributor_id: contributor_1_id,
			})
			.await;
	}
}
