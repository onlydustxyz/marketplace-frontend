mod macros;

mod value_objects;
pub use value_objects::*;

mod event;
pub use event::{Event, Listener as EventListener};

pub mod services;

mod aggregate;
#[cfg(test)]
pub use aggregate::MockRepository as MockAggregateRepository;
pub use aggregate::{
	Aggregate, EventSourcable, Identified, Repository as AggregateRepository,
	RepositoryError as AggregateRepositoryError,
};

mod error;
pub use error::*;

mod messaging;
pub use messaging::{
	CompositePublisher, Message, Publisher, PublisherError, Subscriber, SubscriberCallbackError,
	SubscriberError,
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
pub use user::Id as UserId;

pub mod budget;
pub use budget::{Budget, Error as BudgetError, Event as BudgetEvent, Id as BudgetId};

mod github;
pub use github::{
	service_filters as github_service_filters, CiChecks as GithubCiChecks,
	CodeReview as GithubCodeReview, CodeReviewId as GithubCodeReviewId,
	CodeReviewOutcome as GithubCodeReviewOutcome, CodeReviewStatus as GithubCodeReviewStatus,
	Commit as GithubCommit, FetchIssueService as GithubFetchIssueService,
	FetchPullRequestService as GithubFetchPullRequestService,
	FetchRepoService as GithubFetchRepoService, FetchService as GithubFetchService,
	FetchUserService as GithubFetchUserService, FullPullRequest as GithubFullPullRequest,
	FullUser as GithubFullUser, Issue as GithubIssue, IssueId as GithubIssueId,
	IssueNumber as GithubIssueNumber, IssueStatus as GithubIssueStatus,
	PullRequest as GithubPullRequest, PullRequestId as GithubPullRequestId,
	PullRequestNumber as GithubPullRequestNumber, PullRequestStatus as GithubPullRequestStatus,
	Repo as GithubRepo, RepoId as GithubRepoId, SearchService as GithubSearchService,
	SearchUserService as GithubSearchUserService, Service as GithubService,
	ServiceError as GithubServiceError, ServiceIssueFilters as GithubServiceIssueFilters,
	ServicePullRequestFilters as GithubServicePullRequestFilters,
	ServiceResult as GithubServiceResult, SocialAccount as GithubUserSocialAccount,
	User as GithubUser, UserId as GithubUserId,
};

mod command;
pub use command::{
	repository::Repository as CommandRepository, AggregateId as CommandAggregateId,
	Entity as Command, Id as CommandId,
};

pub mod event_store;
pub use event_store::{Error as EventStoreError, Store as EventStore};

pub mod specifications;
pub use specifications::Error as SpecificationError;

pub mod stream_filter;

pub mod sponsor;
