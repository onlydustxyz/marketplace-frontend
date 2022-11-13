use async_trait::async_trait;
use chrono::Utc;
use marketplace_domain::{Error as DomainError, *};
use marketplace_event_store::{
	bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event as StorableEvent, EventOrigin,
};
use std::sync::Arc;
use uuid::Uuid;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
#[async_trait]
pub trait Usecase<S: Clone + Send + Sync>: Send + Sync {
	async fn associate_github_account(
		&self,
		authorization_code: String,
		user_id: Uuid,
		signed_data: S,
	) -> Result<(), DomainError>;
}

pub struct AssociateGithubAccount<S: Clone + Send + Sync> {
	event_publisher: Arc<dyn Publisher<StorableEvent>>,
	account_verifier: Arc<dyn OnChainAccountVerifier<SignedData = S>>,
	github_client: Arc<dyn GithubClient>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl<S: Clone + Send + Sync> AssociateGithubAccount<S> {
	pub fn new(
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		account_verifier: Arc<dyn OnChainAccountVerifier<SignedData = S>>,
		github_client: Arc<dyn GithubClient>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			event_publisher,
			account_verifier,
			github_client,
			uuid_generator,
		}
	}
}

impl<S: Clone + Send + Sync + 'static> AssociateGithubAccount<S> {
	pub fn new_usecase_boxed(
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		account_verifier: Arc<dyn OnChainAccountVerifier<SignedData = S>>,
		github_client: Arc<dyn GithubClient>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase<S>> {
		Box::new(Self::new(
			event_publisher,
			account_verifier,
			github_client,
			uuid_generator,
		))
	}
}

#[async_trait]
impl<S: Clone + Send + Sync> Usecase<S> for AssociateGithubAccount<S> {
	async fn associate_github_account(
		&self,
		authorization_code: String,
		user_id: Uuid,
		signed_data: S,
	) -> Result<(), DomainError> {
		let events = Contributor::associate_github_account(
			self.account_verifier.clone(),
			self.github_client.clone(),
			authorization_code,
			&user_id,
			signed_data,
		)
		.await?;
		let storable_events: Vec<StorableEvent> = events
			.iter()
			.map(|event| {
				if let Event::Contributor(contributor_event) = event {
					StorableEvent {
						deduplication_id: self.uuid_generator.new_uuid().to_string(),
						event: contributor_event.clone().into(),
						timestamp: Utc::now().naive_utc(),
						origin: EventOrigin::BACKEND,
						metadata: Default::default(),
					}
				} else {
					panic!("Contributor event expected");
				}
			})
			.collect();

		self.event_publisher
			.publish_many(
				Destination::Queue(EVENT_STORE_QUEUE.into()),
				&storable_events,
			)
			.await?;

		Ok(())
	}
}
