/// This module defines the `Usecase` struct and its implementation.
///
/// The `Usecase` struct represents the use case for creating a new project.
///
/// # Example
///
/// ```
/// use std::sync::Arc;
/// use anyhow::Result;
/// use domain::{Amount, DomainError, Event, EventSourcable, Project, ProjectId, Publisher};
/// use infrastructure::amqp::UniqueMessage;
/// use reqwest::Url;
/// use tracing::instrument;
///
/// use crate::{
///     domain::{ImageStoreService, ProjectDetails, Publishable},
///     infrastructure::database::ProjectDetailsRepository,
///     presentation::http::dto::NonEmptyTrimmedString,
///     usecases::create_project::Usecase,
/// };
///
/// let event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>> = unimplemented!();
/// let project_details_repository: ProjectDetailsRepository = unimplemented!();
/// let image_store: Arc<dyn ImageStoreService> = unimplemented!();
///
/// let name = NonEmptyTrimmedString::new("Project Name".into()).unwrap();
/// let short_description = NonEmptyTrimmedString::new("Short description".into()).unwrap();
/// let long_description = NonEmptyTrimmedString::new("Long description".into()).unwrap();
/// let logo_url = Some(Url::parse("https://example.com/logo.png").unwrap());
/// let initial_budget = Some(Amount::new(100));
///
/// let project_id = Usecase::new(event_publisher, project_details_repository, image_store)
///     .create(name, short_description, long_description, None, logo_url, initial_budget)
///     .unwrap();
/// ```
use std::sync::Arc;
use anyhow::Result;
use domain::{Amount, DomainError, Event, EventSourcable, Project, ProjectId, Publisher};
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
    /// Returns a new instance of `Usecase`.
    ///
    /// # Arguments
    ///
    /// * `event_publisher` - A reference to an `Arc` of a type that implements the `Publisher` trait.
    /// * `project_details_repository` - An instance of the `ProjectDetailsRepository`.
    /// * `image_store` - A reference to an `Arc` of a type that implements the `ImageStoreService` trait.
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

    /// Creates a new project with the given name, short description, long description, Telegram link,
    /// logo URL (optional), and initial budget (optional).
    ///
    /// # Arguments
    ///
    /// * `name` - The name of the project as a `NonEmptyTrimmedString`.
    /// * `short_description` - The short description of the project as a `NonEmptyTrimmedString`.
    /// * `long_description` - The long description of the project as a `NonEmptyTrimmedString`.
    /// * `telegram_link` - An optional `Url` for the Telegram link.
    /// * `logo_url` - An optional `Url` for the logo.
    /// * `initial_budget` - An optional initial budget as an `Amount`.
    ///
    /// # Returns
    ///
    /// The ID of the new project as a `ProjectId` or a `DomainError`.
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

        self.project_details_repository.upsert(&ProjectDetails::new(
            project_id,
            name.into(),
            telegram_link.map(|url| url.to_string()),
            stored_logo_url,
            short_description.into(),
            long_description.into(),
        ))?;

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