use crate::*;
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
			Some(mut application) => {
				application.set_status(ApplicationStatus::Pending);
				self.application_projection_repository.update(application)
			},
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
}

impl Projector<Contribution> for ApplicationProjector {
	fn project(&self, event: &<Contribution as Aggregate>::Event) {
		let result = match event {
			ContributionEvent::Applied {
				id: contribution_id,
				contributor_id,
			} => self.on_applied(contribution_id, contributor_id),
			_ => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
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

	#[rstest]
	fn contribution_applied_with_same_contributor_updates_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
	) {
		let contribution_id = ContributionId::from_str("0x123").unwrap();
		let contributor_id = ContributorId::from_str("0x456").unwrap();
		let previous_application = ApplicationProjection::default();

		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().never();
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(
				eq(contribution_id.to_owned()),
				eq(contributor_id.to_owned()),
			)
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(move |_, _| Ok(Some(previous_application.to_owned())));
		application_projection_repository
			.expect_update()
			.withf(|application| ApplicationStatus::Pending == application.status().to_owned())
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector.project(&ContributionEvent::Applied {
			id: contribution_id,
			contributor_id,
		});
	}

	#[rstest]
	fn contribution_applied_creates_an_application(
		mut application_projection_repository: MockApplicationProjectionRepository,
		mut uuid_generator: MockUuidGenerator,
	) {
		let contribution_id = ContributionId::from_str("0x123").unwrap();
		let contributor_id = ContributorId::from_str("0x456").unwrap();
		let application_id: ApplicationId =
			uuid::Uuid::from_str("03b4715c-d237-422c-8689-370e4c257f90").unwrap().into();

		let mut repository_sequence = Sequence::new();
		uuid_generator.expect_new_uuid().returning(move || application_id.into());
		application_projection_repository
			.expect_find_by_contribution_and_contributor()
			.with(
				eq(contribution_id.to_owned()),
				eq(contributor_id.to_owned()),
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
				contributor_id.to_owned(),
			)))
			.once()
			.in_sequence(&mut repository_sequence)
			.returning(|_| Ok(()));

		let projector = ApplicationProjector::new(
			Arc::new(application_projection_repository),
			Arc::new(uuid_generator),
		);

		projector.project(&ContributionEvent::Applied {
			id: contribution_id,
			contributor_id,
		});
	}
}
