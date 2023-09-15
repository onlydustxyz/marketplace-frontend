use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{
	sponsor, Aggregate, Amount, BudgetId, DomainError, Event, Project, ProjectId,
	ProjectVisibility, Publisher,
};
use infrastructure::{amqp::UniqueMessage, database::Repository};
use reqwest::Url;
use tracing::instrument;

use crate::{
	application,
	domain::{ImageStoreService, Publishable},
	models::*,
	presentation::http::dto::NonEmptyTrimmedString,
};

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	image_store: Arc<dyn ImageStoreService>,
	budget_allocation_usecase: application::budget::allocate::Usecase,
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
	) -> Result<(ProjectId, Option<BudgetId>), DomainError> {
		let project_id = ProjectId::new();

		let mut project = Project::create(project_id);
		let mut budget = None;

		if let Some(initial_budget) = initial_budget {
			let result = self.budget_allocation_usecase.build_allocation(
				project,
				initial_budget,
				sponsor_id,
			)?;
			project = result.0;
			budget = Some(result.1);
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

		let budget_id = budget.as_ref().map(|b| b.id);

		project
			.pending_events()
			.clone()
			.into_iter()
			.map(Event::from)
			.chain(
				budget
					.map(|mut b| b.pending_events().clone())
					.unwrap_or_default()
					.into_iter()
					.map(Event::from),
			)
			.map(UniqueMessage::new)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		Ok((project_id, budget_id))
	}
}
