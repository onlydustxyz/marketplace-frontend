use derive_more::{AsRef, Display, From, Into};

mod value_objects;
use serde::{Deserialize, Serialize};
pub use value_objects::*;

mod services;
pub use services::*;

mod event;
pub use event::Event;

mod aggregate;
pub use aggregate::{Aggregate, EventSourcable};

mod messaging;
pub use messaging::{
	Destination, Message, Publisher, PublisherError, Subscriber, SubscriberCallbackError,
	SubscriberError, UniqueMessage,
};

mod project;
pub use project::{Event as ProjectEvent, Id as ProjectId, Project};

mod payment;
pub use payment::{
	Amount, Currency, Event as PaymentEvent, Id as PaymentId, Payment, Receipt as PaymentReceipt,
};

mod payment_request;
pub use payment_request::{Event as PaymentRequestEvent, Id as PaymentRequestId, PaymentRequest};

pub mod aggregate_root;
pub use aggregate_root::{
	AggregateRoot, Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
};

pub mod event_store;
pub use event_store::{Error as EventStoreError, Store as EventStore};

mod specifications;

#[cfg(test)]
pub use specifications::tests::MockSpecifications;
pub use specifications::{Specifications, SpecificationsImpl};

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Display,
	From,
	Into,
	AsRef,
	Hash,
)]
pub struct UserId(uuid::Uuid);
