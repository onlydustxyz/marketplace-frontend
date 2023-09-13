use std::sync::Arc;

use anyhow::Result;
use domain::{
	Amount, Budget, BudgetId, DomainError, Event, EventSourcable, Project, ProjectId,
	ProjectVisibility, Publisher,
};
use infrastructure::{amqp::UniqueMessage, database::Repository};
use reqwest::Url;
use tracing::instrument;

use crate::{
	domain::{ImageStoreService, Publishable},
	models::*,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_details_repository: Arc<dyn Repository<ProjectDetails>>,
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

		let mut project_events = Project::create(project_id);
		let mut budget_events = Vec::new();

		if let Some(initial_budget) = initial_budget {
			let budget_id = BudgetId::new();
			let mut events = Budget::create(budget_id, initial_budget.currency());
			events.append(&mut Budget::from_events(&events).allocate(*initial_budget.amount())?);

			budget_events.append(&mut events.into_iter().map(Into::into).collect());
			project_events
				.append(&mut Project::from_events(&project_events).link_budget(budget_id)?)
		};

		let stored_logo_url = match logo_url {
			Some(url) => Some(self.image_store.store_image_from_url(&url).await?.to_string()),
			None => None,
		};

		self.project_details_repository.upsert(ProjectDetails {
			project_id,
			name: name.into(),
			telegram_link: telegram_link.map(|url| url.to_string()),
			logo_url: stored_logo_url,
			short_description: short_description.into(),
			long_description: long_description.into(),
			rank,
			hiring,
			visibility: visibility.into(),
		})?;

		project_events
			.into_iter()
			.map(Event::from)
			.chain(budget_events)
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok(project_id)
	}
}
