use std::sync::Arc;

use anyhow::Result;
use domain::{DomainError, ProjectId, ProjectVisibility};
use infrastructure::dbclient::Repository;
use juniper::Nullable;
use tracing::instrument;
use url::Url;

use crate::{domain::ImageStoreService, models::*, presentation::http::dto::NonEmptyTrimmedString};

pub struct Usecase {
	project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		project_details_repository: Arc<dyn Repository<ProjectDetails>>,
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
		hiring: Option<bool>,
		rank: Option<i32>,
		visibility: Option<ProjectVisibility>,
	) -> Result<(), DomainError> {
		let mut project = self.project_details_repository.find_by_id(project_id)?;

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
				let stored_logo_url =
					self.image_store.store_image_from_url(&logo_url).await?.to_string();
				project = project.with_logo_url(Some(stored_logo_url));
			} else {
				project = project.with_logo_url(None);
			}
		}
		if let Some(hiring) = hiring {
			project = project.with_hiring(hiring)
		}
		if let Some(rank) = rank {
			project = project.with_rank(rank)
		}
		if let Some(visibility) = visibility {
			project = project.with_visibility(visibility.into()) // TODO turn this into proper DTO
		}

		self.project_details_repository.update(project)?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {

	use ::url::Url;
	use infrastructure::{
		database::enums::ProjectVisibility as ProjectVisibilityEnum,
		dbclient::{ImmutableRepository, Result},
	};
	use mockall::{mock, predicate::eq};
	use rstest::{fixture, rstest};

	use super::*;
	use crate::domain::MockImageStoreService;

	mock! {
		pub ProjectDetailsRepository {}

		impl ImmutableRepository<ProjectDetails> for ProjectDetailsRepository {
			fn exists(&self, id: ProjectId) -> Result<bool>;
			fn try_find_by_id(&self, id: ProjectId) -> Result<Option<ProjectDetails>>;
			fn find_by_id(&self, id: ProjectId) -> Result<ProjectDetails>;
			fn list(&self) -> Result<Vec<ProjectDetails>>;
			fn insert(&self, model: ProjectDetails) -> Result<ProjectDetails>;
			fn try_insert(&self, model: ProjectDetails) -> Result<Option<ProjectDetails>>;
			fn delete(&self, id: ProjectId) -> Result<Option<ProjectDetails>>;
			fn clear(&self) -> Result<()>;
			fn insert_all(&self, models: Vec<ProjectDetails>) -> Result<()>;
			fn try_insert_all(&self, models: Vec<ProjectDetails>) -> Result<()>;
		}

		impl Repository<ProjectDetails> for ProjectDetailsRepository {
			fn update(&self, model: ProjectDetails) -> Result<ProjectDetails>;
			fn update_all(&self, models: Vec<ProjectDetails>) -> Result<()>;
			fn upsert(&self, model: ProjectDetails) -> Result<ProjectDetails>;
		}
	}

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
	#[tokio::test]
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
			.expect_store_image_from_url()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut project_details_repository = MockProjectDetailsRepository::default();
		project_details_repository
			.expect_find_by_id()
			.with(eq(project_id))
			.once()
			.returning(move |_| {
				Ok(ProjectDetails {
					project_id,
					name: "old name".to_string(),
					telegram_link: None,
					logo_url: None,
					short_description: "foo".to_string(),
					long_description: "bar".to_string(),
					hiring: false,
					rank: 0,
					visibility: ProjectVisibilityEnum::Public,
				})
			});
		project_details_repository
			.expect_update()
			.withf(|input: &ProjectDetails| {
				input.logo_url == Some("http://img-store.com/1234.jpg".to_string())
			})
			.once()
			.returning(Ok);

		let usecase = Usecase::new(
			Arc::new(project_details_repository),
			Arc::new(image_store_service),
		);

		usecase
			.update_details(
				project_id,
				Some(name),
				Some(short_description),
				Some(long_description),
				Nullable::Some(telegram_link),
				Nullable::Some(logo_url),
				Some(true),
				Some(32),
				Some(ProjectVisibility::Public),
			)
			.await
			.unwrap();
	}

	#[rstest]
	#[tokio::test]
	async fn test_partial_update_details(
		project_id: ProjectId,
		long_description: NonEmptyTrimmedString,
		logo_url: Url,
		telegram_link: Url,
	) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image_from_url()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut project_details_repository = MockProjectDetailsRepository::default();
		project_details_repository
			.expect_find_by_id()
			.with(eq(project_id))
			.once()
			.returning(move |_| {
				Ok(ProjectDetails {
					project_id,
					name: "old name".to_string(),
					telegram_link: None,
					logo_url: None,
					short_description: "foo".to_string(),
					long_description: "bar".to_string(),
					hiring: false,
					rank: 0,
					visibility: ProjectVisibilityEnum::Public,
				})
			});

		let telegram_link_clone = telegram_link.clone();
		project_details_repository
			.expect_update()
			.withf(move |input: &ProjectDetails| {
				input.clone()
					== ProjectDetails {
						project_id,
						name: "old name".to_string(),
						telegram_link: Some(telegram_link_clone.to_string()),
						logo_url: Some("http://img-store.com/1234.jpg".to_string()),
						short_description: "foo".to_string(),
						long_description: "long_description".to_string(),
						hiring: true,
						rank: 32,
						visibility: ProjectVisibilityEnum::Private,
					}
			})
			.once()
			.returning(Ok);

		let usecase = Usecase::new(
			Arc::new(project_details_repository),
			Arc::new(image_store_service),
		);

		usecase
			.update_details(
				project_id,
				None,
				None,
				Some(long_description),
				Nullable::Some(telegram_link),
				Nullable::Some(logo_url),
				Some(true),
				Some(32),
				Some(ProjectVisibility::Private),
			)
			.await
			.unwrap();
	}
}
