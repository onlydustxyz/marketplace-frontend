use http_api_problem::{HttpApiProblem, StatusCode};
use marketplace_domain::*;
use marketplace_infrastructure::github::GithubError;

pub(crate) trait ToHttpApiProblem {
	fn to_http_api_problem(&self) -> HttpApiProblem;
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

impl ToHttpApiProblem for EventStoreError {
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
