mod value_objects;
pub use value_objects::*;

mod services;
pub use services::*;

mod repositories;
pub use repositories::*;

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
	Event as PaymentEvent, Id as PaymentId, Payment, Receipt as PaymentReceipt,
	ReceiptId as PaymentReceiptId,
};

mod user;
pub use user::{Entity as User, Id as UserId};

pub mod aggregate_root;
pub use aggregate_root::{
	AggregateRoot, Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
};

#[cfg(test)]
pub use aggregate_root::MockRepository as MockAggregateRootRepository;

pub mod event_store;
pub use event_store::{Error as EventStoreError, Store as EventStore};

pub mod specifications;
