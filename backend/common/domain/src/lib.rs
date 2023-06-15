mod value_objects;
pub use value_objects::*;

mod event;
pub use event::Event;

mod aggregate;
pub use aggregate::{Aggregate, Event as AggregateEvent, EventSourcable};

mod entity;
pub use entity::Entity;

mod error;
pub use error::*;

mod messaging;
pub use messaging::{
	Destination, Message, Payload as MessagePayload, Publisher, PublisherError, Subscriber,
	SubscriberCallbackError, SubscriberError,
};

mod project;
pub use project::{
	Error as ProjectError, Event as ProjectEvent, Id as ProjectId, Project,
	Visibility as ProjectVisibility,
};

mod payment;
pub use payment::{
	Error as PaymentError, Event as PaymentEvent, Id as PaymentId, Payment,
	Reason as PaymentReason, Receipt as PaymentReceipt, ReceiptId as PaymentReceiptId,
	Status as PaymentStatus, WorkItem as PaymentWorkItem,
};

mod application;
pub use application::{Application, Event as ApplicationEvent, Id as ApplicationId};

mod user;
pub use user::{Entity as User, Id as UserId};

mod budget;
pub use budget::{Budget, Error as BudgetError, Event as BudgetEvent, Id as BudgetId};

mod github;
pub use github::{
	service_filters as github_service_filters, FetchIssueService as GithubFetchIssueService,
	FetchRepoService as GithubFetchRepoService, FetchService as GithubFetchService,
	FetchUserService as GithubFetchUserService, FullUser as GithubFullUser, Issue as GithubIssue,
	IssueId as GithubIssueId, IssueNumber as GithubIssueNumber, IssueStatus as GithubIssueStatus,
	IssueType as GithubIssueType, Repo as GithubRepo, RepoId as GithubRepoId,
	SearchService as GithubSearchService, SearchUserService as GithubSearchUserService,
	Service as GithubService, ServiceError as GithubServiceError,
	ServiceIssueFilters as GithubServiceIssueFilters, ServiceResult as GithubServiceResult,
	SocialAccount as GithubUserSocialAccount, User as GithubUser, UserId as GithubUserId,
};

mod command;
pub use command::{
	repository::Repository as CommandRepository, AggregateId as CommandAggregateId,
	Entity as Command, Id as CommandId,
};

pub mod aggregate_root;
#[cfg(test)]
pub use aggregate_root::MockRepository as MockAggregateRootRepository;
pub use aggregate_root::{
	AggregateRoot, Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
};

pub mod event_store;
pub use event_store::{Error as EventStoreError, Store as EventStore};

pub mod specifications;
pub use specifications::Error as SpecificationError;

pub mod stream_filter;
