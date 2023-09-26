use std::{collections::HashMap, fmt::Debug, str::FromStr, sync::Arc};

use async_trait::async_trait;
use derive_more::Constructor;
use domain::{
	Application, Budget, Event, EventListener, EventSourcable, EventStore, EventStoreError,
	Identified, Payment, Project, SubscriberCallbackError,
};
use futures::future::try_join_all;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::event_store::Named;
use itertools::Itertools;
use olog::info;
use presentation::http::guards::ApiKey;
use rocket::State;
use thiserror::Error;
use uuid::Uuid;

use crate::domain::projectors::projections;

#[derive(Debug, Error)]
enum Error {
	#[error("Aggregate not found")]
	NotFound,
	#[error("Refresher already exists")]
	DuplicateRefresher,
	#[error(transparent)]
	EventListener(#[from] SubscriberCallbackError),
	#[error(transparent)]
	EventStore(#[from] EventStoreError),
}

impl From<Error> for HttpApiProblem {
	fn from(error: Error) -> Self {
		match &error {
			Error::NotFound =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST).title(error.to_string()),
			Error::DuplicateRefresher =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR).title(error.to_string()),
			Error::EventListener(e) => HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error.to_string())
				.detail(e.to_string()),
			Error::EventStore(e) => HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error.to_string())
				.detail(e.to_string()),
		}
	}
}

#[allow(clippy::too_many_arguments)]
#[post("/events/refresh/<aggregate_name>?<id>")]
pub async fn refresh(
	_api_key: ApiKey,
	aggregate_name: String,
	id: Option<Uuid>,
	project_event_store: &State<Arc<dyn EventStore<Project>>>,
	budget_event_store: &State<Arc<dyn EventStore<Budget>>>,
	application_event_store: &State<Arc<dyn EventStore<Application>>>,
	payment_event_store: &State<Arc<dyn EventStore<Payment>>>,
	projector: &State<projections::Projector>,
) -> Result<(), HttpApiProblem> {
	let mut registry = Registry::new();

	let projector = Arc::new((*projector).clone());

	Refresher::new((*project_event_store).clone(), projector.clone()).register(&mut registry)?;
	Refresher::new((*application_event_store).clone(), projector.clone())
		.register(&mut registry)?;
	Refresher::new((*budget_event_store).clone(), projector.clone()).register(&mut registry)?;
	Refresher::new((*payment_event_store).clone(), projector.clone()).register(&mut registry)?;

	let refresher = registry.get(&aggregate_name).ok_or(Error::NotFound)?;

	let aggregate_ids = match id {
		Some(id) => vec![id.to_string()],
		None => refresher.all_ids()?,
	};

	let handles = aggregate_ids.iter().map(|id| refresher.refresh(id));

	try_join_all(handles).await?;

	Ok(())
}

type Registry = HashMap<String, Arc<dyn Refreshable>>;

trait Registrable {
	fn register(self, registry: &mut Registry) -> Result<(), Error>;
}

impl<R: Refreshable + Named + 'static> Registrable for R {
	fn register(self, registry: &mut Registry) -> Result<(), Error> {
		if registry.insert(R::name(), Arc::new(self)).is_some() {
			return Err(Error::DuplicateRefresher)?;
		}

		Ok(())
	}
}

#[derive(Constructor)]
struct Refresher<A: EventSourcable> {
	event_store: Arc<dyn EventStore<A>>,
	projector: Arc<dyn EventListener<Event>>,
}

impl<A: EventSourcable + Named> Named for Refresher<A> {
	fn name() -> String {
		A::name()
	}
}

#[async_trait]
trait Refreshable: Send + Sync {
	fn all_ids(&self) -> Result<Vec<String>, Error>;
	async fn refresh(&self, id: &str) -> Result<(), Error>;
}

#[async_trait]
impl<A: EventSourcable + Named> Refreshable for Refresher<A>
where
	Event: From<A::Event>,
	A::Id: FromStr,
	<A::Id as FromStr>::Err: Debug,
{
	fn all_ids(&self) -> Result<Vec<String>, Error> {
		let ids = self
			.event_store
			.list()?
			.into_iter()
			.map(|e| e.id().to_string())
			.unique()
			.collect();

		Ok(ids)
	}

	async fn refresh(&self, id: &str) -> Result<(), Error> {
		info!("Refreshing {} {id}", A::name());
		let id = A::Id::from_str(id).expect("Invalid Uuid");
		let events = self.event_store.list_by_id(&id)?;

		if events.is_empty() {
			return Err(Error::NotFound);
		}

		for event in events {
			self.projector.on_event(event.into()).await?;
		}
		Ok(())
	}
}
