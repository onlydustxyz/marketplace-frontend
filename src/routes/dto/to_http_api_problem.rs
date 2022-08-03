use deathnote_contributions_feeder::domain::{
	ApplicationRepositoryError, ContributionRepositoryError, ContributionServiceError,
	ContributorRepositoryError, DomainError,
};
use http_api_problem::{HttpApiProblem, StatusCode};

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for DomainError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			DomainError::ApplicationRepository(application_repository_error) =>
				match application_repository_error {
					ApplicationRepositoryError::NotFound =>
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.title(application_repository_error.to_string()),
					ApplicationRepositoryError::AlreadyExist(e) =>
						HttpApiProblem::new(StatusCode::CONFLICT)
							.title(application_repository_error.to_string())
							.detail(e.to_string()),
					ApplicationRepositoryError::InvalidEntity(e) =>
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.title(application_repository_error.to_string())
							.detail(e.to_string()),
					ApplicationRepositoryError::Infrastructure(e) =>
						HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
							.title(application_repository_error.to_string())
							.detail(e.to_string()),
				},
			DomainError::ContributionRepository(contribution_reopsitory_error) =>
				match contribution_reopsitory_error {
					ContributionRepositoryError::NotFound =>
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.title(contribution_reopsitory_error.to_string()),
					ContributionRepositoryError::AlreadyExist(e) =>
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.title(contribution_reopsitory_error.to_string())
							.detail(e.to_string()),
					ContributionRepositoryError::InvalidEntity(e) =>
						HttpApiProblem::new(StatusCode::BAD_REQUEST)
							.title(contribution_reopsitory_error.to_string())
							.detail(e.to_string()),
					ContributionRepositoryError::Infrastructure(e) =>
						HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
							.title(contribution_reopsitory_error.to_string())
							.detail(e.to_string()),
				},
			DomainError::ContributorRepository(contributor_repository_error) =>
				match contributor_repository_error {
					ContributorRepositoryError::Infrastructure(e) =>
						HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
							.title(contributor_repository_error.to_string())
							.detail(e.to_string()),
				},
			DomainError::ContributionService(contribution_service_error) =>
				match contribution_service_error {
					ContributionServiceError::Infrastructure(e) =>
						HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
							.title(contribution_service_error.to_string())
							.detail(e.to_string()),
				},
			DomainError::Lock =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR).title(self.to_string()),
		}
	}
}
