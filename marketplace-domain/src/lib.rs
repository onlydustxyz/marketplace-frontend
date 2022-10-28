mod repositories;
pub use repositories::*;

mod value_objects;
pub use value_objects::*;

mod errors;
pub use errors::Error;

mod services;
pub use services::*;

mod event;
pub use event::{Event, Origin as EventOrigin, StorableEvent};

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

mod contribution;
pub use contribution::{
	AggregateId as ContributionId, Event as ContributionEvent, Status as ContributionStatus, *,
};

mod project;
pub use project::{
	Event as ProjectEvent, Id as ProjectId, LeadContributorProjection,
	MemberProjection as ProjectMemberProjection, Project,
};

mod aggregate_root_repository;
pub use aggregate_root_repository::{
	Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
};

mod contributor;
pub use contributor::{
	AccountAddress as ContributorAccountAddress, Contributor, ContributorProfile,
	DiscordHandle as ContributorDiscordHandle, Error as ContributorError,
	Event as ContributorEvent,
};

mod projectors;
pub use projectors::{
	ApplicationProjector, ContributorWithGithubData as ContributorWithGithubDataProjector,
	GithubContributionProjector, GithubProjectProjector, LeadContributorProjector,
	MemberProjector as ProjectMemberProjector,
};
