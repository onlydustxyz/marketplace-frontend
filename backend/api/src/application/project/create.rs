use std::sync::Arc;

use anyhow::Result;
use domain::{DomainError, Event, Project, ProjectId, Publisher};
use infrastructure::amqp::UniqueMessage;
use reqwest::Url;
use tracing::instrument;

use crate::{
	domain::{ImageStoreService, ProjectDetails, Publishable},
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
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		Project::create(project_id)
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		let stored_logo_url = match logo_url {
			Some(url) => Some(self.image_store.store_image(&url).await?.to_string()),
			None => None,
		};

		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			name.into(),
			telegram_link.map(|url| url.to_string()),
			stored_logo_url,
			short_description.into(),
			long_description.into(),
		))?;

		Ok(project_id)
	}
}
