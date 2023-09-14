use domain::DomainError;
use http_api_problem::HttpApiProblem;
use olog::IntoField;
use reqwest::StatusCode;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Domain(#[from] DomainError),
}

impl From<Error> for HttpApiProblem {
	fn from(error: Error) -> Self {
		match error {
			Error::Domain(DomainError::InternalError(e)) => {
				olog::error!(error = e.to_field(), "Internal error");
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Internal error")
					.detail(e.to_string())
			},

			Error::Domain(DomainError::InvalidInputs(e)) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Bad request")
					.detail(e.to_string()),
		}
	}
}
