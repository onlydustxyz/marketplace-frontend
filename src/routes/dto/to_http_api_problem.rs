use deathnote_contributions_feeder::domain::{
	ApplicationRepositoryError, ContributionRepositoryError, DomainError,
};
use http_api_problem::{HttpApiProblem, StatusCode};

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
}

impl ToHttpApiProblem for DomainError {
	fn to_http_api_problem(&self) -> HttpApiProblem {
		match self {
			DomainError::ApplicationRepository(e) => match e {
				ApplicationRepositoryError::NotFound => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST).title(e.to_string())
				},
				ApplicationRepositoryError::AlreadyExist(e) => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
				ApplicationRepositoryError::InvalidEntity(e) => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
				ApplicationRepositoryError::Infrastructure(e) => {
					HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
			},
			DomainError::ContributionRepository(e) => match e {
				ContributionRepositoryError::NotFound => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST).title(e.to_string())
				},
				ContributionRepositoryError::AlreadyExist(e) => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
				ContributionRepositoryError::InvalidEntity(e) => {
					HttpApiProblem::new(StatusCode::BAD_REQUEST)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
				ContributionRepositoryError::Infrastructure(e) => {
					HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
						.title(e.to_string())
						.detail(e.source().unwrap().to_string())
				},
			},
			DomainError::ContributorRepository(e) => match e {
    deathnote_contributions_feeder::domain::ContributorRepositoryError::Infrastructure(e) => HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
	.title(e.to_string())
	.detail(e.source().unwrap().to_string()),
},
			DomainError::ContributionService(e) => match e {
    deathnote_contributions_feeder::domain::ContributionServiceError::Infrastructure(e) => HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
	.title(e.to_string())
	.detail(e.source().unwrap().to_string()),
},
		}
	}
}
