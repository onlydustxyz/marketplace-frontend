mod service;
pub use service::{
	filters as service_filters, Error as ServiceError, FetchIssueService, FetchRepoService,
	FetchService, FetchUserService, Filters as ServiceFilters, Result as ServiceResult,
	SearchIssueService, SearchService, SearchUserService, Service,
};

mod repo;
pub use repo::{Id as RepoId, Languages, Repo};

mod user;
pub use user::{Id as UserId, User};

mod issue;
pub use issue::{
	Id as IssueId, Issue, Number as IssueNumber, Status as IssueStatus, Type as IssueType,
};
