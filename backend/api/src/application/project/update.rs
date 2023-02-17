use anyhow::Result;
use domain::{DomainError, ProjectId};
use tracing::instrument;

use crate::{
	domain::ProjectDetails, infrastructure::database::ProjectDetailsRepository,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	project_details_repository: ProjectDetailsRepository,
}

impl Usecase {
	pub fn new(project_details_repository: ProjectDetailsRepository) -> Self {
		Self {
			project_details_repository,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn update_details(
		&self,
		project_id: ProjectId,
		name: NonEmptyTrimmedString,
		short_description: NonEmptyTrimmedString,
		long_description: NonEmptyTrimmedString,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Result<(), DomainError> {
		self.project_details_repository.update(
			&project_id,
			ProjectDetails::new(
				project_id,
				name.into(),
				telegram_link,
				logo_url,
				short_description.into(),
				long_description.into(),
			),
		)?;

		Ok(())
	}
}
