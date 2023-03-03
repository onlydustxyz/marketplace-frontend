use std::sync::Arc;

use anyhow::Result;
use domain::DomainError;
use reqwest::Url;
use tracing::instrument;

use crate::{
	domain::{ImageStoreService, Sponsor, SponsorId},
	infrastructure::database::SponsorRepository,
	presentation::http::dto::NonEmptyTrimmedString,
};

pub struct Usecase {
	sponsor_repository: SponsorRepository,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		sponsor_repository: SponsorRepository,
		image_store: Arc<dyn ImageStoreService>,
	) -> Self {
		Self {
			sponsor_repository,
			image_store,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn create(
		&self,
		name: NonEmptyTrimmedString,
		logo_url: Url,
		url: Option<Url>,
	) -> Result<SponsorId, DomainError> {
		let sponsor_id = SponsorId::new();

		let stored_logo_url = self.image_store.store_image(&logo_url).await?.to_string();

		self.sponsor_repository.insert(&Sponsor::new(
			sponsor_id,
			name.into(),
			stored_logo_url,
			url.map(|url| url.to_string()),
		))?;

		Ok(sponsor_id)
	}
}

#[cfg(test)]
mod tests {

	use ::url::Url;
	use anyhow::anyhow;
	use assert_matches::assert_matches;
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};

	use super::*;
	use crate::domain::{ImageStoreServiceError, MockImageStoreService};

	#[fixture]
	fn name() -> NonEmptyTrimmedString {
		NonEmptyTrimmedString::new("name".to_string()).unwrap()
	}

	#[fixture]
	fn logo_url() -> Url {
		Url::parse("http://sponsor.org/image.jpg").unwrap()
	}

	#[fixture]
	fn url() -> Url {
		Url::parse("http://sponsor.org").unwrap()
	}

	#[rstest]
	async fn test_create(name: NonEmptyTrimmedString, logo_url: Url, url: Url) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut sponsor_repository = SponsorRepository::default();
		sponsor_repository
			.expect_insert()
			.withf(|input| input.logo_url() == "http://img-store.com/1234.jpg")
			.once()
			.returning(|_| Ok(()));

		let usecase = Usecase::new(sponsor_repository, Arc::new(image_store_service));

		usecase.create(name, logo_url, Some(url)).await.unwrap();
	}

	#[rstest]
	async fn test_create_with_bad_logo_url(name: NonEmptyTrimmedString, logo_url: Url, url: Url) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Err(ImageStoreServiceError::NotFound(anyhow!("404"))));

		let mut sponsor_repository = SponsorRepository::default();
		sponsor_repository.expect_insert().never();

		let usecase = Usecase::new(sponsor_repository, Arc::new(image_store_service));

		let result = usecase.create(name, logo_url, Some(url)).await;
		assert_matches!(result, Err(DomainError::InvalidInputs(_)));
	}
}
