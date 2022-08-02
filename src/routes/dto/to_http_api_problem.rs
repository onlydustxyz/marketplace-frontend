use deathnote_contributions_feeder::domain::{
	AnyError, ApplicationRepositoryError, ContributionRepositoryError, DomainError,
};
use http_api_problem::{HttpApiProblem, StatusCode};

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for AnyError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			AnyError::TransactionRevertedError(e) =>
				HttpApiProblem::new(StatusCode::FAILED_DEPENDENCY)
					.title("The on-chain batch transaction failed")
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
			DomainError::ContributionRepository(e) => match e {
				ContributionRepositoryError::NotFound =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST).title(e.to_string()),
				ContributionRepositoryError::AlreadyExist(e) =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
				ContributionRepositoryError::InvalidEntity(e) =>
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
				ContributionRepositoryError::Infrastructure(e) =>
					HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string()),
			},
		}
	}
}
