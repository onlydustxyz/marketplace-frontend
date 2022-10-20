use crate::RefreshError;
use http_api_problem::{HttpApiProblem, StatusCode};
use marketplace_domain::{Error as DomainError, *};
use marketplace_infrastructure::github::GithubError;

use super::hex_prefixed_string::FromHexPrefixedStringError;

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for ApplicationProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ApplicationProjectionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ApplicationProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::CONFLICT)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationProjectionRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ContributionProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ContributionProjectionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ContributionProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributionProjectionRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributionProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for AggregateRootRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			AggregateRootRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			AggregateRootRepositoryError::EventStoreError(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for OnchainContributionServiceError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			OnchainContributionServiceError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for DomainError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			DomainError::ApplicationProjectionRepository(application_repository_error) =>
				application_repository_error.to_http_api_problem(),
			DomainError::ContributionProjectionRepository(contribution_repository_error) =>
				contribution_repository_error.to_http_api_problem(),
			DomainError::ContributionRepository(contribution_repository_error) =>
				contribution_repository_error.to_http_api_problem(),
			DomainError::OnchainContributionService(onchain_contribution_service_error) =>
				onchain_contribution_service_error.to_http_api_problem(),
			DomainError::Lock =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR).title(self.to_string()),
			DomainError::ContributionError(_) => HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Contribution error")
				.detail(self.to_string()),
			DomainError::EventStoreError(_) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Internal error")
					.detail(self.to_string()),
			DomainError::ContributorError(_) => HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Contributor error")
				.detail(self.to_string()),
		}
	}
}

impl ToHttpApiProblem for ParseHexPrefixedStringError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		HttpApiProblem::new(StatusCode::BAD_REQUEST).title(self.to_string())
	}
}

impl ToHttpApiProblem for FromHexPrefixedStringError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		HttpApiProblem::new(StatusCode::BAD_REQUEST).title(self.to_string())
	}
}

impl ToHttpApiProblem for RefreshError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			RefreshError::ProjectionRepository(error) => error.to_http_api_problem(),
			RefreshError::EventStore(error) => error.to_http_api_problem(),
		}
	}
}

impl ToHttpApiProblem for EventStoreError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Internal error")
			.detail(self.to_string())
	}
}

impl ToHttpApiProblem for ProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Internal error")
			.detail(self.to_string())
	}
}

impl ToHttpApiProblem for GithubError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			GithubError::Octocrab(e) => HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(self.to_string())
				.detail(e.to_string()),
			GithubError::Timeout =>
				HttpApiProblem::new(StatusCode::REQUEST_TIMEOUT).title(self.to_string()),
		}
	}
}

impl ToHttpApiProblem for ProjectRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ProjectRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ProjectRepositoryError::AlreadyExist(e) => HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title(self.to_string())
				.detail(e.to_string()),
			ProjectRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ProjectRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ProjectProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ProjectProjectionRepositoryError::NotFound(e) =>
				HttpApiProblem::new(StatusCode::NOT_FOUND)
					.title(self.to_string())
					.detail(e.to_string()),
			ProjectProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ProjectProjectionRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ProjectProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ProjectMemberProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ProjectMemberProjectionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ProjectMemberProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ProjectMemberProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for LeadContributorProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			LeadContributorProjectionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			LeadContributorProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			LeadContributorProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ContributorProjectionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ContributorProjectionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ContributorProjectionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::CONFLICT)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributorProjectionRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributorProjectionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}
