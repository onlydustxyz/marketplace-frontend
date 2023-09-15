use domain::DomainError;
use http_api_problem::HttpApiProblem;
use olog::IntoField;
use reqwest::StatusCode;
use thiserror::Error;

use crate::{application, domain::ImageStoreServiceError};

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

impl From<application::sponsor::Error> for HttpApiProblem {
	fn from(error: application::sponsor::Error) -> Self {
		match error {
			application::sponsor::Error::ImageStore(e) => e.into(),
			application::sponsor::Error::Database(_) => {
				olog::error!(error = error.to_field(), "Database error");
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Internal error")
					.detail(error.to_string())
			},
		}
	}
}

impl From<ImageStoreServiceError> for HttpApiProblem {
	fn from(error: ImageStoreServiceError) -> Self {
		match &error {
			ImageStoreServiceError::Initialization(_) | ImageStoreServiceError::Other(_) => {
				olog::error!(error = error.to_field(), "Failed while storing image");
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Internal error")
					.detail(error.to_string())
			},
			ImageStoreServiceError::NotFound(details)
			| ImageStoreServiceError::UnknownExtension(details) =>
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title(error.to_string())
					.detail(details.to_string()),
		}
	}
}
