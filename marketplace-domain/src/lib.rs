mod repositories;
use derive_more::{AsRef, Display, From, Into};
pub use repositories::*;

mod value_objects;
use serde::{Deserialize, Serialize};
pub use value_objects::*;

mod services;
pub use services::*;

mod event;
pub use event::Event;

mod event_store;
pub use event_store::{Error as EventStoreError, MockStore as MockEventStore, Store as EventStore};

mod aggregate;
pub use aggregate::{Aggregate, AggregateRoot, EventSourcable};

mod event_listener;
pub use event_listener::{EventListener, MockEventListener};

mod messaging;
pub use messaging::{Destination, Message, Publisher, PublisherError, Subscriber, SubscriberError};

mod projection;
pub use projection::Projection;

mod projection_repository;
pub use projection_repository::{Error as ProjectionRepositoryError, ProjectionRepository};

mod project;
pub use project::{Event as ProjectEvent, Id as ProjectId, Project, ProjectLead};

mod aggregate_root_repository;
pub use aggregate_root_repository::{
	Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
};

mod contributor;
pub use contributor::{
	Contributor, ContributorProfile, DiscordHandle as ContributorDiscordHandle,
	Error as ContributorError, Event as ContributorEvent,
};

mod projectors;
pub use projectors::{
	ContributorWithGithubData as ContributorWithGithubDataProjector, ProjectLeadProjector,
};

mod payment;
pub use payment::{Event as PaymentEvent, Id as PaymentId, Payment, Receipt as PaymentReceipt};

mod payment_request;
pub use payment_request::{Id as PaymentRequestId, PaymentRequest};

#[derive(
	Debug, Clone, Copy, Default, Serialize, Deserialize, PartialEq, Eq, Display, From, Into, AsRef,
)]
pub struct UserId(uuid::Uuid);
