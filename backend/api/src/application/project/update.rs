use std::sync::Arc;

use anyhow::Result;
use domain::{DomainError, ProjectId};
use juniper::Nullable;
use tracing::instrument;
use url::Url;

use crate::{
	domain::ImageStoreService, infrastructure::database::ProjectDetailsRepository,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	project_details_repository: ProjectDetailsRepository,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		project_details_repository: ProjectDetailsRepository,
		image_store: Arc<dyn ImageStoreService>,
	) -> Self {
		Self {
			project_details_repository,
			image_store,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn update_details(
		&self,
		project_id: ProjectId,
		name: Option<NonEmptyTrimmedString>,
		short_description: Option<NonEmptyTrimmedString>,
		long_description: Option<NonEmptyTrimmedString>,
		telegram_link: Nullable<Url>,
		logo_url: Nullable<Url>,
	) -> Result<(), DomainError> {
		let mut project = self.project_details_repository.find_by_id(&project_id)?;

		if let Some(name) = name {
			project = project.with_name(name.into());
		}
		if let Some(short_description) = short_description {
			project = project.with_short_description(short_description.into());
		}
		if let Some(long_description) = long_description {
			project = project.with_long_description(long_description.into());
		}
		if let Some(telegram_link) = telegram_link.explicit() {
			project = project.with_telegram_link(telegram_link.map(|url| url.to_string()))
		}
		if let Some(logo_url) = logo_url.explicit() {
			if let Some(logo_url) = logo_url {
				let stored_logo_url = self.image_store.store_image(&logo_url).await?.to_string();
				project = project.with_logo_url(Some(stored_logo_url));
			} else {
				project = project.with_logo_url(None);
			}
		}

		self.project_details_repository.update(&project_id, project)?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {

	use ::url::Url;
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};

	use super::*;
	use crate::domain::{MockImageStoreService, ProjectDetails};

	#[fixture]
	fn project_id() -> ProjectId {
		uuid::Uuid::new_v4().into()
	}

	#[fixture]
	fn name() -> NonEmptyTrimmedString {
		NonEmptyTrimmedString::new("name".to_string()).unwrap()
	}

	#[fixture]
	fn short_description() -> NonEmptyTrimmedString {
		NonEmptyTrimmedString::new("short_description".to_string()).unwrap()
	}

	#[fixture]
	fn long_description() -> NonEmptyTrimmedString {
		NonEmptyTrimmedString::new("long_description".to_string()).unwrap()
	}

	#[fixture]
	fn logo_url() -> Url {
		Url::parse("http://sponsor.org/image.jpg").unwrap()
	}

	#[fixture]
	fn telegram_link() -> Url {
		Url::parse("http://t.me/foo").unwrap()
	}

	#[rstest]
	async fn test_update_details(
		project_id: ProjectId,
		name: NonEmptyTrimmedString,
		short_description: NonEmptyTrimmedString,
		long_description: NonEmptyTrimmedString,
		logo_url: Url,
		telegram_link: Url,
	) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut project_details_repository = ProjectDetailsRepository::default();
		project_details_repository
			.expect_find_by_id()
			.with(eq(project_id))
			.once()
			.returning(move |_| {
				Ok(ProjectDetails::new(
					project_id,
					"old name".to_string(),
					None,
					None,
					"foo".to_string(),
					"bar".to_string(),
				))
			});
		project_details_repository
			.expect_update()
			.withf(|_, input: &ProjectDetails| {
				input.logo_url().clone() == Some("http://img-store.com/1234.jpg".to_string())
			})
			.once()
			.returning(|_, _: ProjectDetails| Ok(()));

		let usecase = Usecase::new(project_details_repository, Arc::new(image_store_service));

		usecase
			.update_details(
				project_id,
				Some(name),
				Some(short_description),
				Some(long_description),
				Nullable::Some(telegram_link),
				Nullable::Some(logo_url),
			)
			.await
			.unwrap();
	}

	#[rstest]
	async fn test_partial_update_details(
		project_id: ProjectId,
		long_description: NonEmptyTrimmedString,
		logo_url: Url,
		telegram_link: Url,
	) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut project_details_repository = ProjectDetailsRepository::default();
		project_details_repository
			.expect_find_by_id()
			.with(eq(project_id))
			.once()
			.returning(move |_| {
				Ok(ProjectDetails::new(
					project_id,
					"old name".to_string(),
					None,
					None,
					"foo".to_string(),
					"bar".to_string(),
				))
			});

		let telegram_link_clone = telegram_link.clone();
		project_details_repository
			.expect_update()
			.withf(move |_, input: &ProjectDetails| {
				input.clone()
					== ProjectDetails::new(
						project_id,
						"old name".to_string(),
						Some(telegram_link_clone.to_string()),
						Some("http://img-store.com/1234.jpg".to_string()),
						"foo".to_string(),
						"long_description".to_string(),
					)
			})
			.once()
			.returning(|_, _: ProjectDetails| Ok(()));

		let usecase = Usecase::new(project_details_repository, Arc::new(image_store_service));

		usecase
			.update_details(
				project_id,
				None,
				None,
				Some(long_description),
				Nullable::Some(telegram_link),
				Nullable::Some(logo_url),
			)
			.await
			.unwrap();
	}
}
