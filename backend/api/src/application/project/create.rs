use std::sync::Arc;

use anyhow::Result;
use domain::{
	Amount, DomainError, Event, EventSourcable, Project, ProjectId, ProjectVisibility, Publisher,
};
use infrastructure::amqp::UniqueMessage;
use reqwest::Url;
use tracing::instrument;

use crate::{
	domain::{ImageStoreService, Publishable},
	infrastructure::database::ProjectDetailsRepository,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: ProjectDetailsRepository,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: ProjectDetailsRepository,
		image_store: Arc<dyn ImageStoreService>,
	) -> Self {
		Self {
			event_publisher,
			project_details_repository,
			image_store,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn create(
		&self,
		name: NonEmptyTrimmedString,
		short_description: NonEmptyTrimmedString,
		long_description: NonEmptyTrimmedString,
		telegram_link: Option<Url>,
		logo_url: Option<Url>,
		initial_budget: Option<Amount>,
		hiring: bool,
		rank: i32,
		visibility: ProjectVisibility,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		let events = Project::create(project_id);

		let budget_events = match initial_budget {
			Some(initial_budget) => Project::from_events(&events)
				.allocate_budget(&initial_budget)
				.map_err(|error| DomainError::InvalidInputs(error.into()))?,
			_ => vec![],
		};

		let stored_logo_url = match logo_url {
			Some(url) => Some(self.image_store.store_image(&url).await?.to_string()),
			None => None,
		};

		// TODO turn this into proper DTO
		self.project_details_repository.upsert(
			&crate::infrastructure::database::ProjectDetails {
				project_id,
				name: name.into(),
				telegram_link: telegram_link.map(|url| url.to_string()),
				logo_url: stored_logo_url,
				short_description: short_description.into(),
				long_description: long_description.into(),
				rank,
				hiring,
				visibility: visibility.into(),
			},
		)?;

		events
			.into_iter()
			.chain(budget_events)
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(project_id)
	}
}
