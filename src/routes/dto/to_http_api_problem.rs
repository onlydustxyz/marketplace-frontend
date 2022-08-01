use deathnote_contributions_feeder::domain::{AnyError, ApplicationRepositoryError, DomainError};
use http_api_problem::{HttpApiProblem, StatusCode};

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for AnyError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			AnyError::ParseStatusError(e) => HttpApiProblem::new(StatusCode::UNPROCESSABLE_ENTITY)
				.title("Failed to parse the contribution status")
				.detail(e),
			AnyError::ProjectListingError(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Failed to list the projects")
					.detail(e),
			AnyError::ContributionStoreError(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Failed to store the contribution in database")
					.detail(e),
			AnyError::TransactionRevertedError(e) =>
				HttpApiProblem::new(StatusCode::FAILED_DEPENDENCY)
					.title("The on-chain batch transaction failed")
					.detail(e),
			AnyError::GetContributorError(e) =>
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Failed to retrieve the contributor")
					.detail(e),
		}
	}
}

impl ToHttpApiProblem for DomainError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			DomainError::ApplicationRepository(e) => match e {
				ApplicationRepositoryError::NotFound =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST).title(e.to_string()),
				ApplicationRepositoryError::AlreadyExist(e) =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
				ApplicationRepositoryError::InvalidEntity(e) =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
				ApplicationRepositoryError::Infrastructure(e) =>
					HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
			},
		}
	}
}
