use std::sync::Arc;

use anyhow::Result;
use domain::{sponsor, DomainError};
use infrastructure::database::Repository;
use juniper::Nullable;
use reqwest::Url;
use tracing::instrument;

use crate::{domain::ImageStoreService, models::*, presentation::http::dto::NonEmptyTrimmedString};

pub struct Usecase {
	sponsor_repository: Arc<dyn Repository<Sponsor>>,
	image_store: Arc<dyn ImageStoreService>,
}

impl Usecase {
	pub fn new(
		sponsor_repository: Arc<dyn Repository<Sponsor>>,
		image_store: Arc<dyn ImageStoreService>,
	) -> Self {
		Self {
			sponsor_repository,
			image_store,
		}
	}

	#[allow(clippy::too_many_arguments)]
	#[instrument(skip(self))]
	pub async fn update(
		&self,
		sponsor_id: sponsor::Id,
		name: Option<NonEmptyTrimmedString>,
		logo_url: Option<Url>,
		url: Nullable<Url>,
	) -> Result<sponsor::Id, DomainError> {
		let mut sponsor = self.sponsor_repository.find_by_id(sponsor_id)?;

		if let Some(name) = name {
			sponsor = sponsor.with_name(name.into());
		}
		if let Some(logo_url) = logo_url {
			let stored_logo_url =
				self.image_store.store_image_from_url(&logo_url).await?.to_string();
			sponsor = sponsor.with_logo_url(stored_logo_url);
		}
		if let Some(url) = url.explicit() {
			sponsor = sponsor.with_url(url.map(|url| url.to_string()))
		}

		self.sponsor_repository.update(sponsor)?;
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
	use crate::{
		application::sponsor::test::MockSponsorRepository,
		domain::{ImageStoreServiceError, MockImageStoreService},
	};

	#[fixture]
	fn sponsor_id() -> sponsor::Id {
		uuid::Uuid::new_v4().into()
	}

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
	#[tokio::test]
	async fn test_update(
		sponsor_id: sponsor::Id,
		name: NonEmptyTrimmedString,
		logo_url: Url,
		url: Url,
	) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image_from_url()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Ok(Url::parse("http://img-store.com/1234.jpg").unwrap()));

		let mut sponsor_repository = MockSponsorRepository::default();
		sponsor_repository
			.expect_find_by_id()
			.with(eq(sponsor_id))
			.once()
			.returning(move |_| {
				Ok(Sponsor {
					id: sponsor_id,
					name: "old name".to_string(),
					logo_url: "http://sponsor.org/old-image.jpg".to_string(),
					url: None,
				})
			});
		sponsor_repository
			.expect_update()
			.withf(|input: &Sponsor| input.logo_url == "http://img-store.com/1234.jpg")
			.once()
			.returning(Ok);

		let usecase = Usecase::new(Arc::new(sponsor_repository), Arc::new(image_store_service));

		usecase
			.update(sponsor_id, Some(name), Some(logo_url), Nullable::Some(url))
			.await
			.unwrap();
	}

	#[rstest]
	#[tokio::test]
	async fn test_update_with_bad_logo_url(
		sponsor_id: sponsor::Id,
		name: NonEmptyTrimmedString,
		logo_url: Url,
		url: Url,
	) {
		let mut image_store_service = MockImageStoreService::new();
		image_store_service
			.expect_store_image_from_url()
			.with(eq(logo_url.clone()))
			.once()
			.returning(|_| Err(ImageStoreServiceError::NotFound(anyhow!("404"))));

		let mut sponsor_repository = MockSponsorRepository::default();
		sponsor_repository
			.expect_find_by_id()
			.with(eq(sponsor_id))
			.once()
			.returning(move |_| {
				Ok(Sponsor {
					id: sponsor_id,
					name: "old name".to_string(),
					logo_url: "http://sponsor.org/old-image.jpg".to_string(),
					url: None,
				})
			});

		let usecase = Usecase::new(Arc::new(sponsor_repository), Arc::new(image_store_service));

		let result = usecase
			.update(sponsor_id, Some(name), Some(logo_url), Nullable::Some(url))
			.await;
		assert_matches!(result, Err(DomainError::InvalidInputs(_)));
	}
}
