use std::sync::Arc;

use anyhow::{anyhow, Result};
use derive_more::Constructor;
use domain::{
	sponsor, Amount, Budget, BudgetId, DomainError, Event, EventSourcable, Project, ProjectId,
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

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	image_store: Arc<dyn ImageStoreService>,
	sponsor_repository: Arc<dyn Repository<Sponsor>>,
}

impl Usecase {
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
		sponsor_id: Option<sponsor::Id>,
		hiring: bool,
		rank: i32,
		visibility: ProjectVisibility,
	) -> Result<ProjectId, DomainError> {
		let project_id = ProjectId::new();

		if let Some(sponsor_id) = sponsor_id {
			if !self.sponsor_repository.exists(sponsor_id)? {
				return Err(DomainError::InvalidInputs(anyhow!(
					"Sponsor does not exist"
				)));
			}
		}

		let mut project_events = Project::create(project_id);
		let mut budget_events = Vec::new();

		if let Some(initial_budget) = initial_budget {
			let budget_id = BudgetId::new();
			let mut events = Budget::create(budget_id, initial_budget.currency());
			events.append(
				&mut Budget::from_events(&events).allocate(*initial_budget.amount(), sponsor_id)?,
			);

			budget_events.append(&mut events.into_iter().map(Into::into).collect());
			project_events.append(
				&mut Project::from_events(&project_events)
					.link_budget(budget_id, initial_budget.currency())?,
			)
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
