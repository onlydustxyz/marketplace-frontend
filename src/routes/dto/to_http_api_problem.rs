use deathnote_contributions_feeder::domain::{
	ApplicationRepositoryError, ApplicationServiceError, ContributionRepositoryError,
	ContributionServiceError, ContributorRepositoryError, DomainError,
};
use http_api_problem::{HttpApiProblem, StatusCode};

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for ApplicationRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ApplicationRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ApplicationRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::CONFLICT)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ContributionRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ContributionRepositoryError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ContributionRepositoryError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributionRepositoryError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ContributionRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ContributorRepositoryError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ContributorRepositoryError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ContributionServiceError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ContributionServiceError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for ApplicationServiceError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			ApplicationServiceError::NotFound =>
				HttpApiProblem::new(StatusCode::NOT_FOUND).title(self.to_string()),
			ApplicationServiceError::AlreadyExist(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationServiceError::InvalidEntity(e) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(self.to_string())
					.detail(e.to_string()),
			ApplicationServiceError::Infrastructure(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(self.to_string())
					.detail(e.to_string()),
		}
	}
}

impl ToHttpApiProblem for DomainError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			DomainError::ApplicationRepository(application_repository_error) =>
				application_repository_error.to_http_api_problem(),
			DomainError::ContributionRepository(contribution_reopsitory_error) =>
				contribution_reopsitory_error.to_http_api_problem(),
			DomainError::ContributorRepository(contributor_repository_error) =>
				contributor_repository_error.to_http_api_problem(),
			DomainError::ContributionService(contribution_service_error) =>
				contribution_service_error.to_http_api_problem(),
			DomainError::ApplicationService(application_service_error) =>
				application_service_error.to_http_api_problem(),
			DomainError::Lock =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR).title(self.to_string()),
		}
	}
}
